/**
 * * Component imports
*/
//? Internal
import React, { Fragment, useState } from 'react';
import { useNavigate } from "react-router-dom";

//? External
import { CCardBody, CCard, CRow, CCol } from '@coreui/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Grid, Button, InputAdornment, FormControlLabel, Checkbox, TextField } from '@mui/material';
import axios from 'axios';

import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import * as fullProposalReducer from '../../redux/FullProposal/actionDispatch';


/**
 * * Component definition
 * @returns <StartPage />
 */
const StartPage = () => {

    const dispatch = useDispatch();

    const { setFullProposal } = bindActionCreators(fullProposalReducer, dispatch);

    const navigate = useNavigate();

    //const for the call api
    const apiCallUrl = 'http://localhost:5000/api/Proposal/CreateFinalProposal';

    /**
     * States
     */

    //state for dataPicker
    const [date, setDate] = useState(null);

    //state for baseValue
    const [baseValue, setBaseValue] = useState(0);

    //state for scheduleExemptionPercent
    const [scheduleExemptionPercent, setScheduleExemptionPercent] = useState(0);

    //state for scheduleExemptionValue
    const [scheduleExemptionValue, setScheduleExemptionValue] = useState(0);

    //state for vacationsAndChristmasTwelfth
    const [vacationsAndChristmasTwelfth, setVacationsAndChristmasTwelfth] = useState(0);

    //state for includeFamilyMemberCheckboxState
    const [includeFamilyMemberCheckboxState, setIncludeFamilyMemberCheckboxState] = useState(false);

    //state for familyHealthInsuranceValue
    const [familyHealthInsuranceValue, setFamilyHealthInsuranceValue] = useState(30);
 


    /**
     * Funcions
     */

    /**
     * function that handle the redirection after button click
     * called on handleSubmit function
     */
    const routeChange = () => {
        navigate("/submitProposal");
    }

    /**
     * function that send the form data to be calculated by backend
     * @param {object} event 
     */
    const handleSubmit = async (event) => {
        event.preventDefault()

        var data = new FormData(event.target);
console.log("data: ", data);
        await axios.post(apiCallUrl, data, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",
                "type": "formData"
            }
        })
            .then((res) => {
                setFullProposal(res.data);
                routeChange();
            })
            .catch((err) => {
                console.error("apiCallHandleSubmit: ", err);
            })
    }

    /**
     * function to handle the changes in the input datePicker
     * @param {Object} dateValueInput 
     */
    const handleDate = (dateValueInput) => {
        let date = new Date(dateValueInput);
        setDate(date);
    };

    /**
     * function to handle the changes in the input baseValue and handle calculations for disable input scheduleExemptionPercent and scheduleExemptionPercent
     * @param {decimal} baseValueInput 
     */
    const handleBaseValue = (baseValueInput) => {
            setBaseValue(baseValueInput);
            handleFinancialCalculatedValue(baseValueInput, scheduleExemptionPercent);
    };

    /**
     * function to handle the changes in the input scheduleExemptionPercent and handle calculations for disable input scheduleExemptionPercent and scheduleExemptionPercent
     * @param {decimal} scheduleExemptionPercentInput 
     */
    const handleScheduleExemptionPercent = (scheduleExemptionPercentInput) => {
            setScheduleExemptionPercent(scheduleExemptionPercentInput);
            handleFinancialCalculatedValue(baseValue, scheduleExemptionPercentInput);
    };

    /**
     * function caled when changes are done in baseValue and scheduleExemptionPercent
     * @param {decimal} baseValueInput 
     * @param {decimal} scheduleExemptionPercentInput 
     */
    const handleFinancialCalculatedValue = (baseValueInput, scheduleExemptionPercentInput) => {
        setScheduleExemptionValue(baseValueInput * (scheduleExemptionPercentInput / 100));
        setVacationsAndChristmasTwelfth((baseValueInput * (1 + (scheduleExemptionPercentInput / 100))) / 12);
    };

    /**
     * function to handle the state responsable to show or hide family member number input according the state of the checkbox 
     * @param {boolean} includeFamilyMemberCheckboxStatus 
     */
    const handleIncludeFamilyMemberCheckboxState = (includeFamilyMemberCheckboxStatus) => {
        setIncludeFamilyMemberCheckboxState(includeFamilyMemberCheckboxStatus);
    }

    const handleFamilyHealthInsurance = (numOfFamilyMembersInsured) => {
        setFamilyHealthInsuranceValue(30 * numOfFamilyMembersInsured);
    }


    /**
     * Return
     */
    return (
        <form onSubmit={(e) => { handleSubmit(e) }}>

            {/*1st part General Information*/}
            <CRow>
                <CCol>
                    <Grid container>

                        <Grid item xs={12}>
                            <CCard style={{ width: "100%", borderTop: "2px solid green", backgroundColor: "#00965E" }} >
                                <CCardBody>
                                    General Information
                                </CCardBody>
                            </CCard>
                        </Grid>

                    </Grid>
                </CCol>
            </CRow>

            <CRow>
                <CCol style={{ paddingTop: 5 }}>
                    <CCard style={{ width: "100%", backgroundColor: "#f5f5dc" }} >
                        <CCardBody style={{ marginTop: 10 }}>
                            <Grid container spacing={1}>

                                <Grid item md={4}>
                                    <TextField
                                        label="Name"
                                        id="margin-normal"
                                        name="name"
                                        placeholder="Enter your full name"
                                        fullWidth
                                        required
                                    />
                                </Grid>

                                <Grid item md={4}>
                                    <TextField
                                        label="Email"
                                        id="margin-normal"
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        fullWidth
                                        required
                                    />
                                </Grid>

                                <Grid item md={4}>
                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                        <DesktopDatePicker
                                            label="Start Date"
                                            value={date}
                                            inputFormat="DD/MM/yyyy"
                                            required
                                            onChange={(newValue) => {
                                                handleDate(newValue);
                                            }}
                                            renderInput={(params) => <TextField name="startDate" {...params} fullWidth />}
                                        />
                                    </LocalizationProvider>
                                </Grid>

                            </Grid>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            {/*2nd part Financial Information*/}
            <CRow>
                <CCol style={{ paddingTop: 20 }}>
                    <Grid container>

                        <Grid item xs={12}>
                            <CCard style={{ width: "100%", borderTop: "2px solid green", backgroundColor: "#00965E" }} >
                                <CCardBody>
                                    Financial Information
                                </CCardBody>
                            </CCard>
                        </Grid>

                    </Grid>
                </CCol>
            </CRow>

            <CRow>
                <CCol style={{ paddingTop: 5 }}>
                    <CCard style={{ width: "100%", backgroundColor: "#f5f5dc" }} >
                        <CCardBody style={{ marginTop: 10 }}>
                            <Grid container spacing={1}>

                                <Grid item md={6}>
                                    <TextField
                                        label="Base Value"
                                        id="margin-normal"
                                        name="baseValue"
                                        placeholder="Enter the base value"
                                        type="number"
                                        fullWidth
                                        required
                                        inputProps={{
                                            step: 0.01,
                                          }}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">€</InputAdornment>,
                                        }}
                                        onChange={(e) => { handleBaseValue(e.currentTarget.value) }}
                                    />
                                </Grid>

                                <Grid item md={6}>
                                    <TextField
                                        label="Work Schedule Exemption %"
                                        id="margin-normal"
                                        name="workScheduleExemptionPercent"
                                        placeholder="Enter the % work schedule exemption"
                                        fullWidth
                                        required
                                        inputProps={{
                                            step: 0.01,
                                          }}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">%</InputAdornment>,
                                        }}
                                        onChange={(e) => { handleScheduleExemptionPercent(e.currentTarget.value) }}
                                    />
                                </Grid>

                                <Grid item md={6}>
                                    <TextField
                                        label="Work Schedule Exemption Value"
                                        id="margin-normal"
                                        value={scheduleExemptionValue}
                                        name="workScheduleExemptionValue"
                                        placeholder="Enter the value work schedule exemption"
                                        fullWidth
                                        required
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">€</InputAdornment>,
                                        }}
                                    />
                                </Grid>

                                <Grid item md={6}>
                                    <TextField
                                        label="IRS Tax"
                                        id="margin-normal"
                                        name="irsTax"
                                        placeholder="Enter the % irs tax"
                                        fullWidth
                                        required
                                        inputProps={{
                                            step: 0.01,
                                          }}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">%</InputAdornment>,
                                        }}
                                    />
                                </Grid>

                                <Grid item md={6}>
                                    <TextField
                                        label="Vacations Twelfth"
                                        id="margin-normal"
                                        value={vacationsAndChristmasTwelfth}
                                        name="vacationsTwelfth"
                                        placeholder="Enter the vacations twelfth"
                                        fullWidth
                                        required
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">€</InputAdornment>,
                                        }}
                                    />
                                </Grid>

                                <Grid item md={6}>
                                    <TextField
                                        label="Christmas Twelfth"
                                        id="margin-normal"
                                        value={vacationsAndChristmasTwelfth}
                                        name="christmasTwelfth"
                                        placeholder="Enter the christmas twelfth"
                                        fullWidth
                                        required
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">€</InputAdornment>,
                                        }}
                                    />
                                </Grid>

                                <Grid item md={6}>
                                    <TextField
                                        label="Other Expenses"
                                        id="margin-normal"
                                        name="otherExpenses"
                                        placeholder="Enter the other expenses"
                                        fullWidth
                                        required
                                        inputProps={{
                                            step: 0.01,
                                          }}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">€</InputAdornment>,
                                        }}
                                    />
                                </Grid>

                                <Grid item md={6}>
                                    <TextField
                                        label="Remote Work Allowance"
                                        id="margin-normal"
                                        defaultValue={15}
                                        name="remoteWorkAllowance"
                                        placeholder="Enter the remote work allowance"
                                        fullWidth
                                        required
                                        inputProps={{
                                            step: 0.01,
                                          }}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">€</InputAdornment>,
                                        }}
                                    />
                                </Grid>

                            </Grid>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            {/*3rd part Benefits Information*/}
            <CRow>
                <CCol style={{ paddingTop: 20 }}>
                    <Grid container>

                        <Grid item xs={12}>
                            <CCard style={{ verticalAlign: "center", width: "100%", borderTop: "2px solid green", backgroundColor: "#00965E" }} >
                                <CCardBody>
                                    Benefits Information
                                </CCardBody>
                            </CCard>
                        </Grid>

                    </Grid>
                </CCol>
            </CRow>

            <CRow>
                <CCol style={{ paddingTop: 5 }}>
                    <CCard style={{ width: "100%", backgroundColor: "#f5f5dc" }} >
                        <CCardBody style={{ marginTop: 10 }}>
                            <Grid container spacing={1}>

                                <Grid item md={4}>
                                    <FormControlLabel control={<Checkbox onChange={(e) => { handleIncludeFamilyMemberCheckboxState(e.target.checked) }} />} label="Inclue Family Member in Health Insurance?" />
                                </Grid>

                                {includeFamilyMemberCheckboxState ?
                                    <Grid item md={2}>
                                        <TextField
                                            defaultValue={includeFamilyMemberCheckboxState ? 1 : 0}
                                            type="number"
                                            label="Familiy Members"
                                            id="margin-normal"
                                            name="numInsuranceFamilyMember"
                                            placeholder="Enter the Familiy Members"
                                            fullWidth
                                            required
                                            onChange={(e) => {handleFamilyHealthInsurance(e.currentTarget.value)}}
                                        />
                                    </Grid>
                                    :
                                    <Fragment></Fragment>
                                }

                                <Grid item md={includeFamilyMemberCheckboxState ? 3 : 4}>
                                    <TextField
                                        label="Comunication Plafond"
                                        id="margin-normal"
                                        name="comunicationPlafond"
                                        placeholder="Enter the comunication plafond"
                                        fullWidth
                                        required
                                        inputProps={{
                                            step: 0.01,
                                          }}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">€</InputAdornment>,
                                        }}
                                    />
                                </Grid>

                                <Grid item md={includeFamilyMemberCheckboxState ? 3 : 4}>
                                    <TextField
                                        label="Health Insurance"
                                        id="margin-normal"
                                        name="healthInsurance"
                                        value={familyHealthInsuranceValue}
                                        placeholder="Enter the Health Insurance"
                                        fullWidth
                                        required
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">€</InputAdornment>,
                                        }}
                                    />
                                </Grid>

                            </Grid>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <CRow>
                <CCol style={{ paddingTop: 30 }}>
                    <Button type="submit" label="Submit" variant="outlined">Evaluate</Button>
                </CCol>
            </CRow>

        </form >
    )
}

/**
 * * Component export
 */
export default StartPage;