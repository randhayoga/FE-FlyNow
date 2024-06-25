import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BreadcrumbPaymentStatus = ({ status }) => {
  return (
    <>
      {status == 200 ? (
        <Breadcrumb className="mb-4 my-6">
          <BreadcrumbList className="text-xl cursor-default">
            <BreadcrumbItem>
              <BreadcrumbPage className="font-bold">
                Isi Data Diri
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-bold">Bayar</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-bold">Selesai</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      ) : status == 201 ? (
        <Breadcrumb className="mb-4 my-6">
          <BreadcrumbList className="text-xl cursor-default">
            <BreadcrumbItem>
              <BreadcrumbPage className="font-bold">
                Isi Data Diri
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-bold">Bayar</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-bold">Pending</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      ) : (
        <p>Invalid Status Code</p>
      )}
    </>
  );
};

export default BreadcrumbPaymentStatus;
