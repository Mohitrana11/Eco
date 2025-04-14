export interface newUserRequestBody {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: "admin" | "user";
  gender: ["male", "female"];
  dob: Date;
}
