import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

type SigninFormProps = {
  loading: boolean;
  onSubmit: SubmitHandler<Inputs>;
};

const SigninForm: React.FC<SigninFormProps> = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
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
          {...register("password", { required: true })}
          className="input input-bordered input-primary w-full max-w-xs mb-2"
        />
        {errors.password && (
          <div id="passwordError" className="mb-2 text-rose-700" role="alert">
            This field is required
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

export default SigninForm;
