"use client";
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarDays, Plus, X } from "lucide-react";
import { createInvoiceFormSchema, CreateInvoiceFormSchema, FormCurrencyData, Item } from "../type";
import { Textarea } from "@/components/ui/textarea";
import { FieldErrors, useFieldArray, UseFieldArrayRemove, useForm, UseFormGetValues, UseFormRegister, UseFormSetValue, UseFormTrigger, UseFormWatch, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatCurrency, formatDate, getCurrencyNameFromId } from "@/lib/utils";
import { RHFSubmitButton } from "@/components/submitButton";
import { FormServerAction } from "../type";

export default function CreateInvoiceForm({ title, data, serverAction, invoiceId, submitButtonText, currencyData }: {
    title: string,
    submitButtonText: string
    invoiceId?: string,
    data?: CreateInvoiceFormSchema,
    currencyData: FormCurrencyData
    serverAction: FormServerAction
}) {
    //For unique identifier for items list (key)
    const identifier = useRef(0);
    const { register, setValue, control, trigger, watch, getValues, handleSubmit, setError, formState: { isSubmitting, errors } } = useForm<CreateInvoiceFormSchema>({
        resolver: zodResolver(createInvoiceFormSchema),
        defaultValues: (data) ? data : {
            items: [],
            subTotal: 0,
            discount: 0,
            total: 0,
            dueDate: new Date(), //If i remove this it will cause error like invalid date format
            currency: currencyData[0].id
        },
        mode: "all",
        reValidateMode: "onChange"
    });
    const { fields, remove, append } = useFieldArray({ control, name: "items" });
    const subTotal = useWatch({ control, name: "subTotal" });
    const total = useWatch({ control, name: "total" });
    const currency = useWatch({ control, name: "currency" });
    const dueDate = watch("dueDate");
    const currencyName = getCurrencyNameFromId(currencyData, currency);

    //Need to do this because of hydration issue i was getting
    // useEffect(() => {
    //     //If check is not applied it will throw hyderation error,
    //     //  wasted a lot of time in this 
    //     if (!data) {
    //         setValue("dueDate", new Date());
    //     }
    // }, []);

    const onSubmit = async (data: CreateInvoiceFormSchema) => {
        const { errors } = await serverAction(data, invoiceId);
        if (errors) {
            Object.entries(errors!).forEach(([key, message]) => {
                setError(key as keyof CreateInvoiceFormSchema, {
                    type: "server",
                    message: message
                })
            })
        }
    }

    return <Card>
        <CardHeader>
            <CardTitle className="text-3xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-10">
                    <div>
                        <div className="flex flex-col sm:flex-row items-start  sm:items-center gap-2 w-fit ">
                            <div className="flex justify-center items-center gap-2">
                                <label className="border bg-gray-700 text-[15px] text-white px-3 py-0.4 rounded-xl">Draft</label>
                                <Input placeholder="Draft Name" className="w-[200px]" {...register("invoiceName")} />
                            </div>
                            <div className="ml-[-8px] flex text-[9px] text-yellow-600 sm:text-xs pl-2 sm:text-justify sm:max-w-[200px] whitespace-normal hyphens-auto">
                                (This will not be send to the client, for search purpose only)
                            </div>
                        </div>
                        {errors.invoiceName && <span className="text-xs text-red-500">{errors.invoiceName.message}</span>}
                    </div>
                    < div className="grid sm:grid-cols-4 gap-4">
                        <div>
                            <Label>Due Date</Label>
                            <Input
                                type="hidden"
                                value={formatDate(dueDate)}
                                {...register("dueDate")}
                            />
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button className="mt-2 w-full overflow-hidden" variant={"outline"}>
                                        {dueDate
                                            ? formatDate(dueDate)
                                            : <div className="flex justify-center items-center gap-2"><CalendarDays /> Select Date</div>
                                        }
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent align="center">
                                    <Calendar className="w-full"
                                        mode="single"
                                        selected={dueDate}
                                        onSelect={(date) => {
                                            setValue("dueDate", date!)
                                        }}
                                        fromDate={new Date()}
                                    />
                                </PopoverContent>
                            </Popover>
                            {errors.dueDate && <p className="text-xs text-red-500 pt-1">{errors.dueDate.message}</p>}
                        </div>
                        <div>
                            <Label>Currency</Label>
                            <Input type="hidden" {...register("currency")} value={currency} />
                            <Select
                                defaultValue={currencyData[0].id.toString()}
                                onValueChange={(currencyId: string) => {
                                    setValue("currency", Number(currencyId));
                                }}>
                                <SelectTrigger className="w-full mt-2">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {currencyData.map((data, idx) => <SelectItem key={idx} value={data.id.toString()} >{`${data.name} (${data.title})`}</SelectItem>)}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {errors.currency && <span className="text-xs text-red-500">{errors.currency.message}</span>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>From</Label>
                            <Input {...register("fromName")} placeholder="Your Name" />
                            {errors.fromName && <span className="text-xs text-red-500">{errors.fromName.message}</span>}
                            <Input type="email" {...register("fromEmail")} placeholder="Your Email" />
                            {errors.fromEmail && <span className="text-xs text-red-500">{errors.fromEmail.message}</span>}
                            <Input {...register("fromAddress")} placeholder="Your Address" />
                            {errors.fromAddress && <span className="text-xs text-red-500">{errors.fromAddress.message}</span>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>To</Label>
                            <Input {...register("toName")} placeholder="Client's Name" />
                            {errors.toName && <span className="text-xs text-red-500">{errors.toName.message}</span>}
                            <Input type="email" {...register("toEmail")} placeholder="Client's Email" />
                            {errors.toEmail && <span className="text-xs text-red-500">{errors.toEmail.message}</span>}
                            <Input {...register("toAddress")} placeholder="Client's Address" />
                            {errors.toAddress && <span className="text-xs text-red-500">{errors.toAddress.message}</span>}
                        </div>
                    </div>
                    <div>
                        <Table>
                            <TableHeader>
                                <TableRow className="grid grid-cols-12 [&>*]:flex [&>*]:items-center [&>*]:text-muted-foreground">
                                    <TableHead className="col-span-5">Description</TableHead>
                                    <TableHead className="col-span-2">Quantity</TableHead>
                                    <TableHead className="col-span-2">Rate</TableHead>
                                    <TableHead className="col-span-2">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {fields.map((item, index) => <ItemRow trigger={trigger} getValues={getValues} remove={remove} watch={watch} setValue={setValue} register={register} errors={errors} {...item} index={index} key={item.id} />)}
                                <TableRow>
                                </TableRow>
                            </TableBody>
                        </Table>
                        {(errors.items) && <span className="text-md text-red-500">{errors.items.message}</span>}
                    </div>
                    <div className="flex justify-between">
                        <Button type="button"
                            variant="outline"
                            className="hover:cursor-pointer"
                            onClick={() => {
                                const item = {
                                    id: identifier.current,
                                    description: "",
                                    quantity: 0,
                                    rate: 0,
                                    amount: 0
                                }
                                identifier.current += 1;
                                append({
                                    description: item.description,
                                    quantity: item.quantity,
                                    rate: item.rate,
                                    amount: item.amount
                                });

                            }
                            }
                        ><Plus /> Add item</Button>
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between text-lg">
                                <Input hidden {...register("subTotal")} />
                                <div>Sub Total</div>
                                <div>{formatCurrency(subTotal, currencyName as string)} </div>
                            </div>
                            <div className="flex gap-4 max-w-full flex-col md:flex-row items-center justify-end">
                                <label className="border flex items-center bg-gray-700 text-[15px] text-white h-6 px-3 py-0.4 rounded-2xl">Discount</label>
                                <div className="flex items-center">
                                    <Input type="number"
                                        {...register("discount", { valueAsNumber: true })}
                                        min={"0"} max={"100"} defaultValue={0.00}
                                        className="flex-4 border-r-0 lg:rounded-r-none w-20  focus-visible:ring-0 focus-visible:outline-none"
                                        onChange={(e) => {
                                            let discount = getFixedDecimal(Number(e.target.value) || 0);
                                            if (discount > 100) {
                                                discount = 0;
                                            }
                                            setValue("discount", discount);
                                            calculateTotal({ getValues, setValue });
                                        }} />
                                    <span className="flex-1 hidden lg:flex border border-l px-2 h-9 rounded-r-md bg-muted items-center">%</span>
                                </div>
                            </div>
                            <div className="flex justify-between text-lg border-t">
                                <div>Total</div>
                                <div className="underline">{formatCurrency(total, currencyName as string)}</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-end gap-40 mt-[-30px]">
                        <div className="flex flex-col flex-3 gap-2 w-1/4">
                            <Label>Note</Label>
                            <Textarea placeholder="Some additional notes..." className="w-[400px]" />
                        </div>
                        <RHFSubmitButton text={submitButtonText} loadingText={"Loading..."} isSubmitting={isSubmitting} />
                        {/* <Button type="submit" className="flex-1 hover:cursor-pointer ml-auto">Generate Invoice</Button> */}
                    </div>
                </div>
            </form>
            {/* DEBUGGING BUTTON */}
            {/* <Button onClick={() => {
                console.log(getValues());
                console.log(errors);
                console.log(errors.items?.message);
            }}>CLICKME</Button> */}
        </CardContent>
    </Card >
}

function ItemRow(props: Item & {
    index: number
    trigger: UseFormTrigger<CreateInvoiceFormSchema>
    getValues: UseFormGetValues<CreateInvoiceFormSchema>
    setValue: UseFormSetValue<CreateInvoiceFormSchema>
    watch: UseFormWatch<CreateInvoiceFormSchema>
    remove: UseFieldArrayRemove
    errors: FieldErrors<CreateInvoiceFormSchema>
    register: UseFormRegister<CreateInvoiceFormSchema>
}) {
    const { index, watch, trigger, getValues, remove, setValue, register, errors } = props;

    return <TableRow className="grid grid-cols-12 [&>*]:flex [&>*]:items-center">

        <TableCell className="col-span-5">
            <div className="w-full">
                <Textarea
                    {...register(`items.${index}.description`)}
                    placeholder="Item name/description"
                    defaultValue={props.description as string}
                />
                {errors.items && errors.items[index]?.description && <span className="text-xs text-red-500">{errors.items[index]?.description.message}</span>}
            </div>
        </TableCell>
        <TableCell className="col-span-2">
            <div className="max-w-full">
                <Input
                    {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                    type="number"
                    step={1}
                    min={0}
                    onChange={(e) => {
                        const quantity = Math.floor(Number(e.target.value) || 0);
                        // e.target.value = String(quantity);
                        setValue(`items.${index}.quantity`, quantity);
                        const rate = Number(getValues(`items.${index}.rate`) || 0);
                        setValue(`items.${index}.amount`, getFixedDecimal(rate * quantity) || 0);
                        // calculateAmount({ getValues, setValue });
                        calculateSubTotal({ getValues, setValue });
                        calculateTotal({ getValues, setValue });
                    }}
                    defaultValue={watch(`items.${index}.quantity`) || 0}></Input>
                {errors.items && errors.items[index]?.quantity && <span className="text-xs text-red-500 block whitespace-normal break-words">{errors.items[index].quantity.message}</span>}
            </div>
        </TableCell>
        <TableCell className="col-span-2">
            <div className="max-w-full">
                <Input {...register(`items.${index}.rate`, { valueAsNumber: true })}
                    type="number"
                    min={0}
                    onChange={(e) => {
                        const rate = getFixedDecimal(Number(e.target.value || 0));
                        setValue(`items.${index}.rate`, rate);
                        const quantity = Number(getValues(`items.${index}.quantity`) || 0);
                        setValue(`items.${index}.amount`, getFixedDecimal(rate * quantity) || 0);
                        // calculateAmount({ getValues, setValue });
                        calculateSubTotal({ getValues, setValue });
                        calculateTotal({ getValues, setValue });
                    }}
                />
                {errors.items && errors.items[index]?.rate && <span className="text-xs text-red-500 block whitespace-normal break-words">{errors.items[index].rate.message}</span>}
            </div>
        </TableCell>
        <TableCell className="col-span-2">
            <div className="max-w-full">
                <Input {...register(`items.${index}.amount`, { valueAsNumber: true })}
                    type="number"
                    min={0}
                    onChange={(e) => {
                        const amount = getFixedDecimal(Number(e.target.value || 0));
                        const quantity = getValues(`items.${index}.quantity`) || 0;
                        const rate = (quantity > 0) ? getFixedDecimal(amount / quantity) : 0;
                        setValue(`items.${index}.rate`, rate);
                        setValue(`items.${index}.amount`, (quantity > 0) ? amount : 0);
                        // calculateAmount({ getValues, setValue });
                        calculateSubTotal({ getValues, setValue });
                        calculateTotal({ getValues, setValue });
                    }}
                // value={(getValues(`items.${index}.quantity`) || 0) * (getValues(`items.${index}.rate`) || 0)}
                ></Input>
                {errors.items && errors.items[index]?.amount && <span className="text-xs text-red-500 block whitespace-normal break-words">{errors.items[index].amount.message}</span>}
            </div>
        </TableCell>
        <TableCell className="col-span-1 justify-center">
            <Button type="button" className="rounded-full h-6 w-6 hover:cursor-pointer" variant={"destructive"}
                // onClick={() => setItemList((list) =>
                //     list.filter((item, idx) => item.id != id)
                // )
                // }
                onClick={() => {
                    remove(index);
                    calculateSubTotal({ getValues, setValue });
                    calculateTotal({ getValues, setValue });
                    trigger("items");
                }}

            ><X className="size-3" /></Button>
        </TableCell>
    </TableRow>
}

const calculateSubTotal = ({ getValues, setValue }: {
    getValues: UseFormGetValues<CreateInvoiceFormSchema>
    setValue: UseFormSetValue<CreateInvoiceFormSchema>
}) => {
    const items = getValues("items");
    const subTotal = items.reduce((sum, item) => {
        return sum + (Number(item.amount) || 0);
    }, 0)
    setValue("subTotal", getFixedDecimal(subTotal));
}

const calculateTotal = ({ getValues, setValue }: {
    getValues: UseFormGetValues<CreateInvoiceFormSchema>
    setValue: UseFormSetValue<CreateInvoiceFormSchema>
}) => {
    const subTotal = getValues("subTotal");
    const discount = getValues("discount");
    const totalAmount = getFixedDecimal((subTotal - (subTotal * discount) / 100));
    setValue("total", totalAmount);
}

function getFixedDecimal(number: number, decimal: number = 2): number {
    return Number(number.toFixed(decimal) || 0);
}