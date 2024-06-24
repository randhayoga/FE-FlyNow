import { useSelector } from "react-redux";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { FaCheckCircle } from "react-icons/fa";

const OrdererField = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <section className="border-2 border-[#8A8A8A] rounded-xl px-3 py-6 mb-6">
      <h1 className="text-lg font-bold tracking-wide mb-3">Isi Data Pemesan</h1>
      <Card className="border-none">
        <CardHeader className="flex flex-row justify-between w-full rounded-t-lg bg-[#3C3C3C] text-white px-4 py-3">
          <p>Data Diri Pemesan</p>
          <FaCheckCircle className="text-alert-success" />
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex flex-col gap-2 mb-4">
            <label
              htmlFor="name"
              className="text-color-primary font-bold text-base tracking-wide"
            >
              Nama Lengkap
            </label>
            <Input
              disabled
              id="name"
              value={user?.name || ""}
              className="border py-2 rounded-md font-medium"
              type="text"
            />
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <label
              htmlFor="phoneNumber"
              className="text-color-primary font-bold text-base tracking-wide"
            >
              Nomor Telepon
            </label>
            <Input
              disabled
              id="phoneNumber"
              value={user?.phoneNumber || ""}
              className="border py-2 rounded-md font-medium"
              type="tel"
            />
          </div>

          <div className="flex flex-col gap-2 mb-4">
            <label
              htmlFor="email"
              className="text-color-primary font-bold text-base tracking-wide"
            >
              Email
            </label>
            <Input
              disabled
              id="email"
              value={user?.email || ""}
              className="border py-2 rounded-md font-medium"
              type="email"
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default OrdererField;
