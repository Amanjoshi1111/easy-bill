"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarDays, CircleX, Cross, Minus, Plus, X } from "lucide-react";
import { Currency, Item } from "./type";
import { Textarea } from "@/components/ui/textarea";

export default function CreateInvoiceForm() {

    const [currency, setCurrency] = useState<Currency>(Currency.INR);
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [itemList, setItemList] = useState<Array<Item>>([
    ]);


    return <Card className="mx-auto max-w-5xl">
        <CardHeader>
            <CardTitle className="text-3xl">Generate Invoice</CardTitle>
        </CardHeader>
        <CardContent>
            <form action="">
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col sm:flex-row items-start  sm:items-center gap-2 w-fit">
                        <div className="flex justify-center items-center gap-2">
                            <div className="border bg-gray-700 text-[15px] text-white px-2 py-0.4 rounded-xl">Draft</div>
                            <Input placeholder="Draft Name" className="w-[200px]" />
                        </div>
                        <div className="ml-[-8px] flex text-[9px] text-yellow-600 sm:text-[10px] pl-2 sm:text-justify sm:max-w-[180px] break-words">
                            (This will not be send to the client, for search purpose only)
                        </div>
                    </div>
                    < div className="grid sm:grid-cols-4 gap-4">
                        <div>
                            <Label>Due Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button className="mt-2 w-full overflow-hidden" variant={"outline"}>
                                        {selectedDate
                                            ? new Intl.DateTimeFormat("en-IN", {
                                                dateStyle: "full"
                                            }).format(selectedDate)
                                            : <div className="flex justify-center items-center gap-2"><CalendarDays /> Select Date</div>
                                        }
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent align="center">
                                    <Calendar className="w-full"
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={(date: Date | undefined) => setSelectedDate(date || new Date())}
                                        fromDate={new Date()}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div>
                            <Label>Currency</Label>
                            <Select onValueChange={(currency: Currency) => setCurrency(currency)}>
                                <SelectTrigger className="w-full mt-2">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value={Currency.INR}>INR - Indian Rupee</SelectItem>
                                        <SelectItem value={Currency.USD}>USD - United States Dollar</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <Label>From</Label>
                            <Input placeholder="Your Name" />
                            <Input placeholder="Your Email" />
                            <Input placeholder="Your Address" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>To</Label>
                            <Input placeholder="Client's Name" />
                            <Input placeholder="Client's Email" />
                            <Input placeholder="Client's Address" />
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
                                {itemList.map((item) => <ItemRow setItemList={setItemList} {...item} key={item.id} />)}
                                <TableRow>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex justify-between">
                        <Button type="button" variant="outline" className="hover:cursor-pointer mt-[-30px]" onClick={() => setItemList((itemList) => [...itemList, {
                            id: Math.random(),
                            description: "",
                            quantity: 0,
                            rate: 0,
                            amount: 0
                        }]
                        )}><Plus /> Add item</Button>
                        <Button>Generate Invoice</Button>
                    </div>
                </div>
            </form>
        </CardContent>
    </Card >
}

function ItemRow(props: Item & {
    setItemList: Dispatch<SetStateAction<Item[]>>
}) {
    return <TableRow className="grid grid-cols-12 [&>*]:flex [&>*]:items-center">
        <TableCell className="col-span-5">
            <Textarea defaultValue={props.description as string} />
        </TableCell>
        <TableCell className="col-span-2">
            <div className="flex gap-2 items-center">
                <Button className="hidden md:flex justify-center items-center rounded-full h-6 w-6" type="button"><Minus /></Button>
                <Input className="text-center" defaultValue={props.quantity}></Input>
                <Button className="hidden md:flex text-center rounded-full h-6 w-6" type="button"><Plus /></Button>
            </div>
        </TableCell>
        <TableCell className="col-span-2">
            <Input defaultValue={props.rate}></Input>
        </TableCell>
        <TableCell className="col-span-2">
            <Input defaultValue={props.amount}></Input>
        </TableCell>
        <TableCell className="col-span-1 justify-center">
            <Button type="button" className="rounded-full h-6 w-6 hover:cursor-pointer" variant={"destructive"}
                onClick={() => props.setItemList((list) =>
                    list.filter(item => item.id != props.id)
                )
                }><X className="size-4" /></Button>
        </TableCell>
    </TableRow>
}