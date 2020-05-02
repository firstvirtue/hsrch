import { extend } from "vee-validate";
import { required, alpha_num, confirmed, min } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "필수 입력 항목입니다."
});

extend("alpha_num", {
  ...alpha_num,
  message: "This field must only contain alphabetic characters"
});

extend("confirmed", {
  ...confirmed,
  message: "비밀번호와 같은 값이어야 합니다."
});

extend("min", {
  ...min,
  message: (field, param) => `${param.length}글자 이상 입력하세요.`
});
