// validator types
const REQUIRE = 'REQUIRE';
const MINLENGTH = 'MINLENGTH';
const EMAIL = 'EMAIL';

// validator exports
export const VALIDATOR_REQUIRE = () => ({
  type: REQUIRE,
});
export const VALIDATOR_MINLENGTH = (val) => ({
  type: MINLENGTH,
  val: val,
});
export const VALIDATOR_EMAIL = () => ({
  type: EMAIL,
});

// validating functions
export const validate = (input, validators) => {
  let isValid = true;

  for (const validator of validators) {
    if (validator.type === REQUIRE) {
      isValid = isValid && input.trim().length > 0;
    }
    if (validator.type === MINLENGTH) {
      isValid = isValid && input.trim().length >= validator.val;
    }
    if (validator.type === EMAIL) {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(input);
    }
  }
  return isValid;
};
