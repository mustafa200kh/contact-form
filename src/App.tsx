import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Svg from "./assets/icon-success-check.svg";

const contactFormSchema = z.object({
  firstName: z.string().min(1, { message: "This field is required" }),
  lastName: z.string().min(1, { message: "This field is required" }),
  emailAddress: z
    .string()
    .email()
    .min(1, { message: "Please enter a vaild email address" }),
  queryType: z.string({ message: "Please select a query type" }),
  message: z.string().min(1, { message: "This field is required" }),
  teamContact: z.literal(true),
});

type TContactFormInputs = z.infer<typeof contactFormSchema>;

function App() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TContactFormInputs>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<TContactFormInputs> = (data) => {
    console.log(data);
    setShowModal(true);
  };
  return (
    <div className="relative w-full bg-bgColor min-h-screen py-10">
      {/* Success Modal */}
      <div
        className={`fixed left-1/2 -translate-x-1/2 ${
          showModal ? "top-[5%]" : "-top-full"
        } z-10 w-250px p-4 bg-hoverColor text-textColor rounded-md`}
      >
        <div className="flex items-center mb-2 gap-2">
          <Svg />
          <h3 className="text-white font-semibold"> Message Sent!</h3>
        </div>
        <p className="text-[#ccc] text-sm">
          Thanks for completeing the form, we'll be in touch soon!
        </p>
      </div>
      <div className="form w-[90%] md:w-1/2 mx-auto bg-white p-6 rounded-lg ">
        <h2 className="text-2xl text-textColor mb-5">Contact Us</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* form elements */}
          <div className="grid grid-cols-2 gap-4 items-start">
            <div className="col-span-2 md:col-span-1">
              <p className="text-textColor mb-2">
                First Name <span className="text-mainColor">*</span>
              </p>
              <input
                type="text"
                className={`border-[1px] border-solid ${
                  errors.firstName?.message ? "border-red-500" : "border-[#bbb]"
                } border-[#bbb] w-full p-2 outline-none focus:border-mainColor caret-mainColor focus:bg-bgColor rounded-md`}
                {...register("firstName")}
              />
              <span className={` text-sm text-red-500 inline-block opacity-1 `}>
                {errors.firstName?.message}
              </span>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="text-textColor mb-2">
                Last Name <span className="text-mainColor">*</span>
              </p>
              <input
                type="text"
                className={`border-[#bbb] ${
                  errors.lastName?.message ? "border-red-500" : "border-[#bbb]"
                } border-[1px] border-solid  w-full p-2 outline-none focus:border-mainColor caret-mainColor focus:bg-bgColor rounded-md`}
                {...register("lastName")}
              />
              <span className={` text-sm text-red-500 inline-block opacity-1 `}>
                {errors.lastName?.message}
              </span>
            </div>
            <div className="col-span-2">
              <p className="text-textColor mb-2">
                Email Address <span className="text-mainColor">*</span>
              </p>
              <input
                type="text"
                className={`border-[#bbb] ${
                  errors.emailAddress?.message
                    ? "border-red-500"
                    : "border-[#bbb]"
                } border-[1px] border-solid w-full p-2 outline-none focus:border-mainColor caret-mainColor focus:bg-bgColor rounded-md`}
                {...register("emailAddress")}
              />
              <span className={` text-sm text-red-500 inline-block opacity-1 `}>
                {errors.emailAddress?.message}
              </span>
            </div>
            <p className="text-textColor mb-2 col-span-2">
              Query Type <span className="text-mainColor">*</span>
            </p>
            <div className="col-span-2 md:col-span-1">
              <label
                htmlFor="hs-vertical-radio-in-form"
                className="max-w-xs flex p-3 w-full bg-white focus:bg-bgColor border border-[#bbb] rounded-lg text-sm focus:border-mainColor focus:ring-mainColor"
              >
                <input
                  type="radio"
                  className="shrink-0 mt-0.5 border-gray-200 rounded-full accent-mainColor text-mainColor focus:bg-bgColor disabled:opacity-50 disabled:pointer-events-none"
                  id="hs-vertical-radio-in-form"
                  value={"GeneralInquery"}
                  {...register("queryType")}
                />
                <span className="text-sm text-gray-500 ms-3">
                  General Inquery
                </span>
              </label>
            </div>
            <div className="col-span-2 md:col-span-1">
              <label
                htmlFor="hs-vertical-radio-checked-in-form"
                className="max-w-xs flex p-3 w-full bg-white focus:bg-bgColor border border-[#bbb] rounded-lg text-sm focus:border-mainColor focus:ring-mainColor"
              >
                <input
                  type="radio"
                  className="shrink-0 mt-0.5 border-gray-200 rounded-full accent-mainColor text-mainColor focus:bg-bgColor disabled:opacity-50 disabled:pointer-events-none"
                  id="hs-vertical-radio-checked-in-form"
                  value={"SupportRequest"}
                  {...register("queryType")}
                />
                <span className="text-sm text-gray-500 ms-3">
                  Support Request
                </span>
              </label>
            </div>
            <p className={` text-sm text-red-500 block opacity-1 col-span-2`}>
              {errors.queryType?.message}
            </p>
            <div className="col-span-2">
              <p className="text-textColor mb-2">
                Message <span className="text-mainColor">*</span>
              </p>
              <textarea
                className={`border-[#bbb] ${
                  errors.message?.message ? "border-red-500" : "border-[#bbb]"
                } border-[1px] border-solid w-full p-2 outline-none focus:border-mainColor caret-mainColor focus:bg-bgColor rounded-md resize-none h-70px`}
                {...register("message")}
              ></textarea>
              <span className={` text-sm text-red-500 block opacity-1`}>
                {errors.message?.message}
              </span>
            </div>
            <div className="col-span-2">
              {/* <p className="text-textColor mb-2"> */}
              <div className="flex">
                <input
                  type="checkbox"
                  className="shrink-0 mt-0.5 accent-mainColor border-gray-200 rounded disabled:pointer-events-none"
                  id="hs-default-checkbox"
                  {...register("teamContact")}
                />
                <label
                  htmlFor="hs-default-checkbox"
                  className="text-sm ms-3 text-textColor"
                >
                  I consent to being contacted by the team.
                </label>
              </div>
              <span
                className={` text-sm text-red-500 block opacity-1 col-span-2`}
              >
                {errors.teamContact?.message &&
                  "To Submit this form, please consent to being contacted"}
              </span>
            </div>
            <div className="col-span-2">
              <button className="w-full p-2 outline-none font-semibold bg-mainColor hover:bg-hoverColor text-white rounded-md">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
