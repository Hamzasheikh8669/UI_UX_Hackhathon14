//src\app\confirmation\page.tsx
import React from 'react'
import Image from 'next/image'
import { Table, TableCaption,TableHeader,TableBody,TableFooter,TableRow,TableCell,TableHead } from '../../components/ui/table'
import Link from 'next/link'



async function Confirmation({searchParams}:{searchParams : Promise<{productName:string, totalItems:number,totalPrice:number,subTotal:number }>}) {


const{ productName, totalItems,totalPrice,subTotal}=await searchParams


  return (
    <div className='min-h-screen bg-white px-4 md:px-8 lg:px-12'>

<div className="bg-[url('/blogMainImage.png')] bg-cover bg-center py-16 mb-12">
        <div className="container text-center">
          <div className="inline-block w-16 h-16 bg-[url('/logo1.png')] mb-4" />
          <h1 className="text-3xl md:text-4xl font-medium mb-4 font-poppins">Confirmation</h1>
          <div className="flex items-center justify-center gap-2 text-sm">
            <Link href="/" className="hover:underline">Home</Link>
            <span>
              <Image src="/rightA.png" width={20} height={20} alt="arrow" />
            </span>
            <span>Confirmation</span>
          </div>
        </div>
      </div>

<div className='text-center'>

    <h2 className='font-bold text-[20px] mb-10'>Thank you For Your Order!</h2>
    <p>Your Order has been successfully placed. We will contact you soon to confirm the details.</p>
</div>




<Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Product</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        
          <TableRow >
            <TableCell className="font-medium">invoice#1</TableCell>
            <TableCell> {totalItems}</TableCell>
            <TableCell>{productName}</TableCell>
            <TableCell className="text-right">Rs. {subTotal}</TableCell>
          </TableRow>
        
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">Rs. {totalPrice}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>

    </div>
  )
}

export default Confirmation