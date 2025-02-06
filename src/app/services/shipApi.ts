"use server";

//----------------------------------------------GET request-------------------------
export async function getShipments() {
  const res = await fetch(`https://api.shipengine.com/v1/carriers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "API-Key": process.env.NEXT_PUBLIC_SHIPMENT_API_KEY as string,
    },
  });

  const data = await res.json();

  return data;
}

// --------------------------------------------POST Request--------------------------

interface data {
  to_name: string;
  to_phone: string;
  to_address: string;
  to_city:string;
  
  from_name: string;
  from_company: string;
  from_address: string;
  from_phone: string;

  weight: number;
  height:number;
  width:number;
  length:number;
}
export async function postRequest(item: data) {
  const { to_name, to_phone, to_address,to_city,from_name,from_company,from_phone,from_address,
    weight,height,width,length
   } = item;

  const res = await fetch(`https://api.shipengine.com/v1/labels`, {
    method: "POST",
    headers: {
      "API-Key": process.env.NEXT_PUBLIC_SHIPMENT_API_KEY as string,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      shipment: {
        carrier_id: "se-1576443",
        service_code: "usps_priority_mail_express",
        ship_to: {
          name: to_name,
          phone: to_phone,
          address_line1: to_address,
          city_locality: to_city,
          state_province: "CA",
          postal_code: "95128",
          country_code: "US",
          address_residential_indicator: "yes",
        },
        ship_from: {
          name: from_name,
          company_name: from_company,
          phone: from_phone,
          address_line1: from_address,
          city_locality: "Austin",
          state_province: "TX",
          postal_code: "78731",
          country_code: "US",
          address_residential_indicator: "no",
        },
        packages: [
          {
            weight: {
              value: weight,
              unit: "ounce",
            },
            dimensions: {
              height: height,
              width: width,
              length: length,
              unit: "inch",
            },
          },
        ],
      },
    }),
  });

  const data = await res.json();

  
  return data;
}