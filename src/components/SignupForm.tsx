import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

type SignupFormProps = {
  loading: boolean;
  onSubmit: SubmitHandler<Inputs>;
};

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="name"
          id="name"
          {...register("name", { required: true })}
          className="input input-bordered input-primary w-full max-w-xs mb-2"
        />
        {errors.name && (
          <div id="nameError" className="mb-2 text-rose-700" role="alert">
            This field is required
          </div>
        )}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email", { required: true })}
          className="input input-bordered input-primary w-full max-w-xs mb-2"
        />
        {errors.email && (
          <div id="emailError" className="mb-2 text-rose-700" role="alert">
            This field is required
          </div>
        )}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register("password", {
            required: true,
            pattern:
              /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/i,
          })}
          className="input input-bordered input-primary w-full max-w-xs mb-2"
        />
        {errors.password && (
          <div id="passwordError" className="mb-2 text-rose-700" role="alert">
            Password must:
            <ul>
              <li>Be minimum length of 8 characters</li>
              <li>Contain at least 1 letter</li>
              <li>Contain at least 1 number</li>
              <li>Contain at least 1 special character</li>
            </ul>
          </div>
        )}
      </div>
      <button type="submit" disabled={loading} className="btn btn-sm">
        Submit{" "}
        {loading && (
          <span className="loading loading-spinner loading-xs"></span>
        )}
      </button>
    </form>
  );
};

export default SignupForm;
