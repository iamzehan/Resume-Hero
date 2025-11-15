import { type Data } from "../../lib/utils";

export default function Personal({data, onSet}:{data:Data, onSet:(data:Data)=>void}) {
  return (
    <form>
      <fieldset className="flex flex-col">
        <legend>Personal Information</legend>
        <label htmlFor="name">Full name </label>
        <input type="text" name="name" placeholder="Full name"></input>
        <label htmlFor="phone">Phone number </label>
        <input type="text" name="phone" placeholder="Phone number"></input>
        <label htmlFor="email">Email </label>
        <input type="email" name="email" placeholder="you@example.com"></input>
      </fieldset>
    </form>
  );
}
