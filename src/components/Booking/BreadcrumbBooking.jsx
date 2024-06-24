import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BreadcrumbBooking = () => {
  return (
    <Breadcrumb className="mb-4 my-6">
      <BreadcrumbList className="text-xl cursor-default">
        <BreadcrumbItem>
          <BreadcrumbPage className="font-bold">Isi Data Diri</BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold text-muted-foreground">
            Bayar
          </BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold text-muted-foreground">
            Selesai
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbBooking;
