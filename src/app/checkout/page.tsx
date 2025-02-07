"use client";

import { Suspense, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { postRequest } from "../../services/shipApi";
import JsonResponseViewer from "@/components/JsonResponseViewer";
import FeatureSection from "@/components/feacturesSection";

// CheckoutFormContent Component
const CheckoutFormContent = () => {
  const searchParams = useSearchParams();
  const productName = searchParams.get("productName") || "Unknown Product";
  const totalItems = Number(searchParams.get("totalItems")) || 1;
  const totalPrice = Number(searchParams.get("totalPrice")) || 0;
  const subTotal = Number(searchParams.get("subTotal")) || 0;

  const [carrierId, setCarrierId] = useState("se-1576443");
  const [serviceCode, setServiceCode] = useState("usps_priority_mail_express");

  // Ship To State
  const [shipTofName, setShipTofName] = useState("");
  const [shipTolName, setShipTolName] = useState("");
  const [shipToCompany, setShipToCompany] = useState("");
  const [shipToPhone, setShipToPhone] = useState("");
  const [shipToAddress, setShipToAddress] = useState("");
  const [shipToCity, setShipToCity] = useState("");
  const [shipToState, setShipToState] = useState("");
  const [shipToPostalCode, setShipToPostalCode] = useState("");
  const [shipToCountry, setShipToCountry] = useState("");

  const [shipmentResponse, setShipmentResponse] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submitData = {
      to_name: `${shipTofName} ${shipTolName}`,
      to_phone: shipToPhone,
      to_address: shipToAddress,
      to_city: shipToCity,
      from_name: "Sender Name",
      from_company: "Sender Company",
      from_phone: "1234567890",
      from_address: "Sender Address",
      weight: 10,
      height: 5,
      width: 5,
      length: 5,
    };

    const data = await postRequest(submitData);
    setShipmentResponse(data);
  };

  return (
    <div className="min-h-screen bg-white px-4 md:px-8 lg:px-12">
      {/* Hero Section */}
      <div className="bg-[url('/images/shop.png')] bg-cover bg-center py-16 mb-12">
        <div className="container text-center">
          <div className="inline-block w-16 h-16 bg-[url('/logo1.png')] mb-4" />
          <h1 className="text-3xl md:text-4xl font-medium mb-4 font-poppins">
            CheckOut
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>
              <ChevronRight />
            </span>
            <span>Checkout</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Billing Details Form */}
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8">
            Billing details
          </h2>
          <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Carrier ID */}
              <div>
                <Label
                  htmlFor="carrier_id"
                  className="block text-sm font-medium text-gray-700"
                >
                  Carrier ID
                </Label>
                <Input
                  id="carrier_id"
                  value={carrierId}
                  onChange={(e) => setCarrierId(e.target.value)}
                  autoComplete="off"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Service Code */}
              <div>
                <Label
                  htmlFor="service_code"
                  className="block text-sm font-medium text-gray-700"
                >
                  Service Code
                </Label>
                <Select value={serviceCode} onValueChange={setServiceCode}>
                  <SelectTrigger
                    id="service_code"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <SelectValue placeholder="Select a service code" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usps_priority_mail_express">
                      USPS Priority Mail Express
                    </SelectItem>
                    <SelectItem value="usps_priority_mail">
                      USPS Priority Mail
                    </SelectItem>
                    <SelectItem value="usps_first_class_mail">
                      USPS First Class Mail
                    </SelectItem>
                    <SelectItem value="ups_ground">UPS Ground</SelectItem>
                    <SelectItem value="fedex_ground">FedEx Ground</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label
                    htmlFor="ship_to_fname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </Label>
                  <Input
                    id="ship_to_fname"
                    value={shipTofName}
                    onChange={(e) => setShipTofName(e.target.value)}
                    autoComplete="off"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="ship_to_lname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </Label>
                  <Input
                    id="ship_to_lname"
                    value={shipTolName}
                    onChange={(e) => setShipTolName(e.target.value)}
                    autoComplete="off"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Address Fields */}
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="ship_to_company"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company Name
                  </Label>
                  <Input
                    id="ship_to_company"
                    value={shipToCompany}
                    onChange={(e) => setShipToCompany(e.target.value)}
                    autoComplete="off"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="ship_to_address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Street Address
                  </Label>
                  <Input
                    id="ship_to_address"
                    value={shipToAddress}
                    onChange={(e) => setShipToAddress(e.target.value)}
                    autoComplete="off"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <Label
                      htmlFor="ship_to_city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </Label>
                    <Input
                      id="ship_to_city"
                      value={shipToCity}
                      onChange={(e) => setShipToCity(e.target.value)}
                      autoComplete="off"
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="ship_to_state"
                      className="block text-sm font-medium text-gray-700"
                    >
                      State
                    </Label>
                    <Input
                      id="ship_to_state"
                      value={shipToState}
                      onChange={(e) => setShipToState(e.target.value)}
                      autoComplete="off"
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="ship_to_postal_code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Postal Code
                    </Label>
                    <Input
                      id="ship_to_postal_code"
                      value={shipToPostalCode}
                      onChange={(e) => setShipToPostalCode(e.target.value)}
                      autoComplete="off"
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="ship_to_country"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Country
                    </Label>
                    <Input
                      id="ship_to_country"
                      value={shipToCountry}
                      onChange={(e) => setShipToCountry(e.target.value)}
                      autoComplete="off"
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="ship_to_phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone
                    </Label>
                    <Input
                      id="ship_to_phone"
                      value={shipToPhone}
                      onChange={(e) => setShipToPhone(e.target.value)}
                      autoComplete="off"
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <Label
                  htmlFor="additional"
                  className="block text-sm font-medium text-gray-700"
                >
                  Additional Information
                </Label>
                <Textarea
                  id="additional"
                  placeholder="Notes about your order"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </Button>

              {shipmentResponse && (
                <JsonResponseViewer data={shipmentResponse} />
              )}
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between text-lg md:text-xl font-medium">
                  <span>Product</span>
                  <span>Subtotal</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>{productName}</span>
                  <span>Rs. {subTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Total number of Items</span>
                  <span>{totalItems}</span>
                </div>

                <div className="flex justify-between border-t pt-4">
                  <span>Subtotal(after discount)</span>
                  <span>Rs. {totalPrice}</span>
                </div>

                <div className="flex justify-between border-t pt-4">
                  <span>Total</span>
                  <span className="text-[#B88E2F] font-bold">
                    Rs. {totalPrice}
                  </span>
                </div>

                <RadioGroup defaultValue="bank-transfer" className="mt-8">
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <RadioGroupItem
                        value="bank-transfer"
                        id="bank-transfer"
                        className="mt-1"
                      />
                      <div className="space-y-2">
                        <Label htmlFor="bank-transfer">
                          Direct Bank Transfer
                        </Label>
                        <p className="text-sm text-gray-600">
                          Make your payment directly into our bank account.
                          Please use your Order ID as the payment reference.
                          Your order will not be shipped until the funds have
                          cleared in our account.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash">Cash On Delivery</Label>
                    </div>
                  </div>
                </RadioGroup>

                <div className="text-sm text-gray-600 mt-4">
                  Your personal data will be used to support your experience
                  throughout this website, to manage access to your account, and
                  for other purposes described in our privacy policy.
                </div>

                <Link
                  href={`/confirmation?productName=${productName}&totalItems=${totalItems}&totalPrice=${totalPrice}&subTotal=${subTotal}`}
                >
                  <Button className="w-full mt-4" size="lg">
                    Place order
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <FeatureSection />
    </div>
  );
};

// CheckoutPage Component
export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutFormContent />
    </Suspense>
  );
}
