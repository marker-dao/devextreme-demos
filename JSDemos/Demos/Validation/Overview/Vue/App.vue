<template>
  <form
    action="your-action"
    @submit="onFormSubmit($event)"
  >
    <div class="dx-fieldset">
      <div class="dx-fieldset-header">Credentials</div>
      <div class="dx-field">
        <div class="dx-field-label">Email</div>
        <div class="dx-field-value">
          <DxTextBox :input-attr="{ 'aria-label': 'Email' }">
            <DxValidator>
              <DxRequiredRule message="Email is required"/>
              <DxEmailRule message="Email is invalid"/>
              <DxAsyncRule
                :validation-callback="asyncValidation"
                message="Email is already registered"
              />
            </DxValidator>
          </DxTextBox>
        </div>
      </div>
      <div class="dx-field">
        <div class="dx-field-label">Password</div>
        <div class="dx-field-value">
          <DxTextBox
            v-model:value="password"
            :input-attr="{ 'aria-label': 'Password' }"
            v-model:mode="passwordMode"
            @value-changed="onPasswordChanged"
          >
            <DxTextBoxButton
              name="password"
              location="after"
              :options="passwordButton"
            />
            <DxValidator>
              <DxRequiredRule message="Password is required"/>
            </DxValidator>
          </DxTextBox>
        </div>
      </div>
      <div class="dx-field">
        <div class="dx-field-label">Confirm Password</div>
        <div class="dx-field-value">
          <DxTextBox
            v-model:value="confirmPassword"
            :input-attr="{ 'aria-label': 'Password' }"
            v-model:mode="confirmPasswordMode"
          >
            <DxTextBoxButton
              name="password"
              location="after"
              :options="confirmPasswordButton"
            />
            <DxValidator @initialized="onInit">
              <DxRequiredRule message="Confirm Password is required"/>
              <DxCompareRule
                :comparison-target="passwordComparison"
                message="Password and Confirm Password do not match"
              />
            </DxValidator>
          </DxTextBox>
        </div>
      </div>
    </div>
    <div class="dx-fieldset">
      <div class="dx-fieldset-header">Personal Data</div>
      <div class="dx-field">
        <div class="dx-field-label">Name</div>
        <div class="dx-field-value">
          <DxTextBox
            value="Peter"
            :input-attr="{ 'aria-label': 'Name' }"
          >
            <DxValidator>
              <DxRequiredRule message="Name is required"/>
              <DxPatternRule
                :pattern="namePattern"
                message="Do not use digits in the Name"
              />
              <DxStringLengthRule
                :min="2"
                message="Name must have at least 2 symbols"
              />
            </DxValidator>
          </DxTextBox>
        </div>
      </div>
      <div class="dx-field">
        <div class="dx-field-label">Date of birth</div>
        <div class="dx-field-value">
          <DxDateBox
            invalid-date-message="The date must have the following format: MM/dd/yyyy"
            :input-attr="{ 'aria-label': 'Date' }"
          >
            <DxValidator>
              <DxRequiredRule message="Date of birth is required"/>
              <DxRangeRule
                :max="maxDate"
                message="You must be at least 21 years old"
              />
            </DxValidator>
          </DxDateBox>
        </div>
      </div>
      <div class="dx-field">
        <div class="dx-field-label">Vacation Dates</div>
        <div class="dx-field-value">
          <DxDateRangeBox
            :input-attr="{ 'aria-label': 'Vacation' }"
          >
            <DxValidator>
              <DxCustomRule
                :validation-callback="validateVacationDatesRange"
                message="The vacation period must not exceed 25 days"
              />
              <DxCustomRule
                :validation-callback="validateVacationDatesPresence"
                message="Both start and end dates must be selected"
              />
            </DxValidator>
          </DxDateRangeBox>
        </div>
      </div>
    </div>
    <div class="dx-fieldset">
      <div class="dx-fieldset-header">Billing address</div>
      <div class="dx-field">
        <div class="dx-field-label">Country</div>
        <div class="dx-field-value">
          <DxSelectBox
            :data-source="countries"
            :input-attr="{ 'aria-label': 'Country' }"
            validation-message-position="left"
          >
            <DxValidator>
              <DxRequiredRule message="Country is required"/>
            </DxValidator>
          </DxSelectBox>
        </div>
      </div>
      <div class="dx-field">
        <div class="dx-field-label">City</div>
        <div class="dx-field-value">
          <DxTextBox
            validation-message-position="left"
            :input-attr="{ 'aria-label': 'City' }"
          >
            <DxValidator>
              <DxRequiredRule message="City is required"/>
              <DxPatternRule
                :pattern="namePattern"
                message="Do not use digits in the City name"
              />
              <DxStringLengthRule
                :min="2"
                message="City must have at least 2 symbols"
              />
            </DxValidator>
          </DxTextBox>
        </div>
      </div>
      <div class="dx-field">
        <div class="dx-field-label">Address</div>
        <div class="dx-field-value">
          <DxTextBox
            validation-message-position="left"
            :input-attr="{ 'aria-label': 'Address' }"
          >
            <DxValidator>
              <DxRequiredRule message="Address is required"/>
            </DxValidator>
          </DxTextBox>
        </div>
      </div>
      <div class="dx-field">
        <div class="dx-field-label">Phone <i>(optional)</i></div>
        <div class="dx-field-value">
          <DxTextBox
            :mask-rules="phoneRules"
            :input-attr="{ 'aria-label': 'Mask' }"
            mask="+1 (X00) 000-0000"
            mask-invalid-message="The phone must have a correct USA phone format"
            validation-message-position="left"
          >
            <DxValidator>
              <DxPatternRule
                :pattern="phonePattern"
                message="The phone must have a correct USA phone format"
              />
            </DxValidator>
          </DxTextBox>
        </div>
      </div>
    </div>

    <div class="dx-fieldset">
      <div class="dx-field">
        <div class="dx-field-label">
          <DxCheckBox
            id="check"
            :value="false"
            text="I agree to the Terms and Conditions"
            validation-message-position="right"
          >
            <DxValidator>
              <DxCompareRule
                :comparison-target="checkComparison"
                message="You must agree to the Terms and Conditions"
              />
            </DxValidator>
          </DxCheckBox>
        </div>
        <div class="dx-field-value">
          <DxButton
            width="120px"
            :use-submit-behavior="true"
            text="Register"
            type="default"
          />
        </div>
      </div>
      <DxValidationSummary id="summary"/>
    </div>
  </form>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import DxSelectBox from 'devextreme-vue/select-box';
import DxCheckBox from 'devextreme-vue/check-box';
import { DxTextBox, DxButton as DxTextBoxButton } from 'devextreme-vue/text-box';
import DxDateBox from 'devextreme-vue/date-box';
import DxDateRangeBox from 'devextreme-vue/date-range-box';
import DxButton from 'devextreme-vue/button';
import DxValidationSummary from 'devextreme-vue/validation-summary';
import {
  DxValidator,
  DxRequiredRule,
  DxCompareRule,
  DxEmailRule,
  DxPatternRule,
  DxStringLengthRule,
  DxRangeRule,
  DxAsyncRule,
  DxCustomRule,
} from 'devextreme-vue/validator';
import notify from 'devextreme/ui/notify';
import service from './data.js';

const currentDate = new Date();
const countries = ref(service.getCountries());
const phoneRules = ref({
  X: /[02-9]/,
});
const password = ref('');
const confirmPassword = ref('');
const passwordMode = ref('password');
const confirmPasswordMode = ref('password');
const passwordButton = ref({
  icon: 'eyeopen',
  stylingMode: 'text',
  onClick: () => {
    passwordMode.value = passwordMode.value === 'text' ? 'password' : 'text';
  },
});
const confirmPasswordButton = ref({
  icon: 'eyeopen',
  stylingMode: 'text',
  onClick: () => {
    confirmPasswordMode.value = confirmPasswordMode.value === 'text' ? 'password' : 'text';
  },
});
const namePattern = ref(/^[^0-9]+$/);
const phonePattern = ref(/^[02-9]\d{9}$/);
const maxDate = ref(new Date(currentDate.setFullYear(currentDate.getFullYear() - 21)));

let validatorInstance;

function passwordComparison() {
  return password.value;
}

function checkComparison() {
  return true;
}

function asyncValidation(params) {
  return sendRequest(params.value);
}

function validateVacationDatesRange({ value }) {
  const [startDate, endDate] = value;

  if (startDate === null || endDate === null) {
    return true;
  }

  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const daysDifference = Math.abs((endDate - startDate) / millisecondsPerDay);

  return daysDifference < 25;
}

function validateVacationDatesPresence({ value }) {
  const [startDate, endDate] = value;

  if (startDate === null && endDate === null) {
    return true;
  }

  return startDate !== null && endDate !== null;
}

function onPasswordChanged() {
  if (confirmPassword.value) {
    validatorInstance?.validate();
  }
}

function onInit(e) {
  validatorInstance = e.component;
}

function onFormSubmit(e) {
  notify({
    message: 'You have submitted the form',
    position: {
      my: 'center top',
      at: 'center top',
    },
  }, 'success', 3000);

  e.preventDefault();
}

function sendRequest(value) {
  const invalidEmail = 'test@dx-email.com';

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value !== invalidEmail);
    }, 1000);
  });
}
</script>
<style scoped>
#summary {
  padding-left: 10px;
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
