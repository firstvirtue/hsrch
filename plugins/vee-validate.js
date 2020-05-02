import { extend } from "vee-validate";
import { required, alpha } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "필수 입력 항목입니다."
});

extend("alpha", {
  ...alpha,
  message: "This field must only contain alphabetic characters"
});
