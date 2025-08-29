import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../lib/api";

const schema = z.object({
  budgetMin: z.coerce.number().min(0).default(0),
  budgetMax: z.coerce.number().min(0),
  bedrooms: z.coerce.number().min(0).default(0),
  city: z.string().min(2),
  propertyType: z.enum(["Apartment","Villa","Flat"]).default("Apartment")
}).refine((d)=> d.budgetMax>=d.budgetMin, { message:"Max must be >= Min", path:["budgetMax"]});

export default function Preferences(){
  const { register, handleSubmit, formState:{errors,isSubmitting} } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (vals)=>{
    await api.put("/users/preferences", vals); // requires JWT
    alert("Preferences saved");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{maxWidth:560,margin:"24px auto",padding:16,border:"1px solid #ddd"}}>
      <h2>Preferences</h2>
      <label>City</label>
      <input {...register("city")} />
      {errors.city && <p style={{color:"crimson"}}>{errors.city.message}</p>}

      <label>Property Type</label>
      <select {...register("propertyType")}>
        <option>Apartment</option><option>Villa</option><option>Flat</option>
      </select>

      <label>Bedrooms</label>
      <input type="number" {...register("bedrooms")} />

      <label>Budget Min (₹)</label>
      <input type="number" {...register("budgetMin")} />
      <label>Budget Max (₹)</label>
      <input type="number" {...register("budgetMax")} />
      {errors.budgetMax && <p style={{color:"crimson"}}>{errors.budgetMax.message}</p>}

      <button disabled={isSubmitting} type="submit">Save</button>
    </form>
  );
}
