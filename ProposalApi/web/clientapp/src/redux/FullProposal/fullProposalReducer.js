import * as proposalActions from './actionTypes';

/**
 * reducer for the handling of showing the sidebar
 * @param {reducerName} state as sideBar state default beeing the object
 * @param {action.type} sideBarActions
 * @param {action.payload} bool
 * @see sideBarActions for more info of the types and their meanings
 * @returns state if no action is equal if debug mode is activated will console log the undefined action
 */
// const reducerName = "sideBarReducer";
/**
 * initial state
 */
const fullProposalObject = {
    id: 0,
    name: "",
    email: "",
    startDate: "",
    baseValue: 0,
    workScheduleExemptionPercent: 0,
    workScheduleExemptionValue: 0,
    vacationsTwelfth: 0,
    christmasTwelfth: 0,
    otherExpenses: 0,
    remoteWorkAllowance: 0,
    irsTax: 0,
    comunicationPlafond: 0,
    healthInsurance: 0,
    numInsuranceFamilyMember: 0,
    baseValueSocialSecurity: 0,
    christmasAllowanceTwelfthSocialSecurity: 0,
    vacationsAllowanceTwelfthSocialSecurity: 0,
    baseValueIrs: 0,
    christmasAllowanceIrs: 0,
    vacationsAllowanceIrs: 0,
    monthlyGrossValue: 0,
    monthlyNetValue: 0,
    annualGrossValue: 0,
    annualNetValue: 0,
    monthlyBenefits: 0,
    annualBenefits: 0,
    annualCost: 0,
    monthlyCost: 0,
    dailyCost: 0
}

export default function fullProposalReducer(state = fullProposalObject, { type, payload }) {
  switch (type) {
    case proposalActions.SET_FULL_PROPOSAL:
      console.log("set pay load: ", payload );

      return { payload }

    default:
      
      return state;

  }
}
