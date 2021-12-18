// validator types
const REQUIRE = 'REQUIRE';

// validator exports
export const VALIDATOR_REQUIRE = () => ({
  type: REQUIRE,
});

// validating functions
export const validate = (input, validators) => {
  let isValid = true;

  for (const validator of validators) {
    if (validator.type === REQUIRE) {
      isValid = isValid && input.trim().length > 0;
    }
  }
  return isValid;
};
