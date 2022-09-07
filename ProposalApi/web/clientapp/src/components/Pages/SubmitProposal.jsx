/**
 * * Component imports
*/
//? Internal
import React, { Fragment } from 'react';

//? External
import { CCardBody, CCard, CRow, CCol } from '@coreui/react';
import { Button, Typography, ButtonGroup } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import dateFormat from 'dateformat';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


/**
 * * Component definition
 * @returns <StartPage />
 */
const SubmitProposal = () => {


    const fullProposal = useSelector(storeState => storeState.fullProposalState.payload);

    const navigate = useNavigate();

    //const for the call api
    const apiCallUrl = "http://localhost:5000/api/Proposal/SendFinalProposal";

    /**
     * Funcions
     */

    /**
     * function that handle the redirection after button click
     * called on handleSubmit function redirecting to the form after mail is sent
     */
    const handleCancel = () => {
        navigate("/");
    }

    /**
     * function that send the data to be sended by mail
     */
    const handleSendEmail = async () => {
        
        await axios.post(apiCallUrl, fullProposal)
            .then((res) => {

                toast.success("A mail with the proposal has been sent",{
                    position: toast.POSITION.TOP_CENTER,
                });
                
                handleCancel();

            })
            .catch((err) => {
                console.error("apiCall: ", err);
                toast.error("Error! Ther was an error sending the proposal",{
                    position: toast.POSITION.TOP_CENTER,
                });
            })
    }

    /**
     * Return
     */
    return (
        <Fragment>

            {/*1st part General Information*/}
            <CRow>
                <CCol>
                    <CCard style={{ width: "100%", borderBottom: "2px solid" }} >
                        <CCardBody>
                            <h2>General Information</h2>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <CRow>
                <CCol style={{ paddingTop: 5 }}>
                    <CCard style={{ width: "100%" }} >
                        <CCardBody style={{ marginTop: 10 }}>
                            <CCol md={12}><Typography variant="h6" >Name: {fullProposal.name}</Typography></CCol>
                            <CCol md={12}><Typography variant="h6" >Email: {fullProposal.email}</Typography></CCol>
                            <CCol md={12}>
                                <Typography variant="h6" >Start Date: {dateFormat(fullProposal.startDate, "dddd, mmmm  dS, yyyy")}</Typography>
                            </CCol>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            {/*2nd part Financial Information*/}
            <CRow>
                <CCol style={{ paddingTop: 20 }}>
                    <CCard style={{ width: "100%", borderBottom: "2px solid" }} >
                        <CCardBody>
                            <h2>Financial Information</h2>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <CRow>
                <CCol style={{ paddingTop: 5 }}>
                    <CCard style={{ width: "100%" }} >
                        <CCardBody style={{ marginTop: 10 }}>
                            <CCol md={12}><Typography variant="h6" >Base Value: €{fullProposal.baseValue}</Typography></CCol>
                            <CCol md={12}><Typography variant="h6" >Work Schedule Exemption: {fullProposal.workScheduleExemptionPercent}%</Typography></CCol>
                            <CCol md={12}><Typography variant="h6" >Work Schedule Exemption Value: €{fullProposal.workScheduleExemptionValue}</Typography></CCol>
                            <CCol md={12}><Typography variant="h6" >IRS Tax: {fullProposal.irsTax}%</Typography></CCol>
                            <CCol md={12}><Typography variant="h6" >Vacations Twelfth: €{fullProposal.vacationsTwelfth}</Typography></CCol>
                            <CCol md={12}><Typography variant="h6" >Christmas Twelfth: €{fullProposal.christmasTwelfth}</Typography></CCol>
                            <CCol md={12}><Typography variant="h6" >Other Expenses: €{fullProposal.otherExpenses}</Typography></CCol>
                            <CCol md={12}><Typography variant="h6" >Remote Work Allowance: €{fullProposal.remoteWorkAllowance}</Typography></CCol>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            {/*3rd part Benefits Information*/}
            <CRow>
                <CCol style={{ paddingTop: 20 }}>
                    <CCard style={{ width: "100%", borderBottom: "2px solid" }} >
                        <CCardBody>
                            <h2>Benefits Information</h2>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <CRow>
                <CCol style={{ paddingTop: 5 }}>
                    <CCard style={{ width: "100%" }} >
                        <CCardBody style={{ marginTop: 10 }}>
                            <CCol md={12}><Typography variant="h6" >Number of Family Members: {fullProposal.numInsuranceFamilyMember}</Typography></CCol>
                            <CCol md={12}><Typography variant="h6" >Comunication Plafond: €{fullProposal.comunicationPlafond}</Typography></CCol>
                            <CCol md={12}><Typography variant="h6" >Health Insurance: €{fullProposal.healthInsurance}</Typography></CCol>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            {/*4rd part Deductions Information*/}
            <CRow>
                <CCol style={{ paddingTop: 20 }}>
                    <CCard style={{ width: "100%", borderBottom: "2px solid" }} >
                        <CCardBody>
                            <h2>Deductions Information</h2>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <CRow>
                <CCol style={{ paddingTop: 5 }}>
                    <CCard style={{ width: "100%" }} >
                        <CCardBody style={{ marginTop: 10 }}>
                            <CCol md={12}><Typography variant="h6" >Base Value Social Security: €{fullProposal.baseValueSocialSecurity}</Typography></CCol>
                            <CCol md={12}>
                                <Typography variant="h6" >Christmas Allowance Twelfth Social Security: €{fullProposal.christmasAllowanceTwelfthSocialSecurity}</Typography>
                            </CCol>
                            <CCol md={12}>
                                <Typography variant="h6" >Vacations Allowance Twelfth Social Security: €{fullProposal.vacationsAllowanceTwelfthSocialSecurity}</Typography>
                            </CCol>
                            <CCol md={12}><Typography variant="h6" >Base Value IRS: €{fullProposal.baseValueIrs}</Typography></CCol>
                            <CCol md={12}><Typography variant="h6" >Christmas Allowance Twelfth IRS: €{fullProposal.christmasAllowanceIrs}</Typography></CCol>
                            <CCol md={12}><Typography variant="h6" >Vacations Allowance Twelfth IRS: €{fullProposal.vacationsAllowanceIrs}</Typography></CCol>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>


            {/*5rd part Values Information*/}
            <CRow>
                <CCol style={{ paddingTop: 20 }}>
                    <CCard style={{ width: "100%", borderBottom: "2px solid" }} >
                        <CCardBody>
                            <h2>Values Information</h2>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <CRow>
                <CCol style={{ paddingTop: 5 }}>
                    <CCard style={{ width: "100%" }} >
                        <CCardBody style={{ marginTop: 10 }}>
                            <CCol md={12}><Typography variant="h6" >Monthly Gross Value: €{fullProposal.monthlyGrossValue}</Typography></CCol>
                            <CCol md={12}><Typography variant="h6" >Monthly Net Value: €{fullProposal.monthlyNetValue}</Typography></CCol>
                            <CCol md={12}><Typography variant="h6" >Annual Gross Value: €{fullProposal.annualGrossValue}</Typography></CCol>
                            <CCol md={12}><Typography variant="h6" >Annual Net Value: €{fullProposal.annualNetValue}</Typography></CCol>
                            <CCol md={12}><Typography variant="h6" >Monthly Benefits: €{fullProposal.monthlyBenefits}</Typography></CCol>
                            <CCol md={12}><Typography variant="h6" >Annual Benefits: €{fullProposal.annualBenefits}</Typography></CCol>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>


            {/*6rd part Costs Information*/}
            <CRow>
                <CCol style={{ paddingTop: 20 }}>
                    <CCard style={{ width: "100%", borderBottom: "2px solid" }} >
                        <CCardBody>
                            <h2>Costs Information</h2>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <CRow>
                <CCol style={{ paddingTop: 5 }}>
                    <CCard style={{ width: "100%" }} >
                        <CCardBody style={{ marginTop: 10 }}>
                            <CCol md={12}><Typography variant="h6" >Annual Cost: €{fullProposal.annualCost}</Typography></CCol>
                            <CCol md={12}><Typography variant="h6" >Monthly Cost: €{fullProposal.monthlyCost}</Typography></CCol>
                            <CCol md={12}><Typography variant="h6" >Daily Cost: €{fullProposal.dailyCost}</Typography></CCol>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <CRow>
                <CCol style={{ paddingTop: 30 }}>
                    <ButtonGroup aria-label="small button group">
                        <Button onClick={handleSendEmail}>Send Proposal</Button>
                        <Button onClick={handleCancel}>Cancel</Button>
                    </ButtonGroup>
                </CCol>
            </CRow>

        </Fragment>
    )
}

/**
 * * Component export
 */
export default SubmitProposal;