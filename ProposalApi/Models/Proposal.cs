using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using System;
using System.ComponentModel.DataAnnotations;
using System.IO;

namespace ProposalApi.Models
{
    public class Proposal
    {
        private Decimal ssTax = 0.11m;
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public decimal BaseValue { get; set; }

        [Required]
        public decimal WorkScheduleExemptionPercent { get; set; }

        [Required]
        public decimal WorkScheduleExemptionValue { get; set; }

        [Required]
        public decimal VacationsTwelfth { get; set; }

        [Required]
        public decimal ChristmasTwelfth { get; set; }

        [Required]
        public decimal OtherExpenses { get; set; }

        [Required]
        public decimal RemoteWorkAllowance { get; set; }

        [Required]
        public decimal IrsTax { get; set; }  
        
        [Required]
        public decimal ComunicationPlafond { get; set; }

        [Required]
        public decimal HealthInsurance { get; set; }

        public int NumInsuranceFamilyMember { get; set; }

        public decimal BaseValueSocialSecurity { get { return ((BaseValue + WorkScheduleExemptionValue) * ssTax); } }

        public decimal ChristmasAllowanceTwelfthSocialSecurity { get { return (ChristmasTwelfth * ssTax); } }

        public decimal VacationsAllowanceTwelfthSocialSecurity { get { return (ChristmasTwelfth * ssTax); } }

        public decimal BaseValueIrs { get { return ((BaseValue + WorkScheduleExemptionValue) * (IrsTax / 100) ); } }

        public decimal ChristmasAllowanceIrs { get { return (ChristmasTwelfth * (IrsTax / 100)); } }

        public decimal VacationsAllowanceIrs { get { return (VacationsTwelfth * (IrsTax / 100)); } }

        public decimal MonthlyGrossValue { 
            get { 
                return (BaseValue + WorkScheduleExemptionValue + VacationsTwelfth + ChristmasTwelfth + OtherExpenses + RemoteWorkAllowance); 
            }
        }

        public decimal MonthlyNetValue { 
            get { 
                return (MonthlyGrossValue - (BaseValueSocialSecurity + ChristmasAllowanceTwelfthSocialSecurity + VacationsAllowanceTwelfthSocialSecurity + BaseValueIrs + ChristmasAllowanceIrs + VacationsAllowanceIrs)); 
            } 
        }

        public decimal AnnualGrossValue { get { return (MonthlyGrossValue * 12); } }

        public decimal AnnualNetValue { get { return (MonthlyNetValue * 12); } }

        public decimal MonthlyBenefits { get { return (ComunicationPlafond + HealthInsurance); } }

        public decimal AnnualBenefits { get { return (MonthlyBenefits * 12); } }

        public decimal AnnualCost { get { return (AnnualGrossValue + AnnualBenefits); } }

        public decimal MonthlyCost { get { return (AnnualCost / 12); } }

        public decimal DailyCost { get { return (MonthlyCost / 18); } }

        public Stream ToPdfStream()
        {
            var stream = new MemoryStream();
            var writer = new PdfWriter(stream);
            var pdf = new PdfDocument(writer);
            var document = new Document(pdf);

            document.Add(new Paragraph(ToReportString()));
            document.Close();

            return new MemoryStream(stream.ToArray());
        }

        public String ToReportString()
        {
            return @$"General Information
Name: {Name}
Email: {Email}
Start Date: {StartDate}

Financial Information
Base Value: {BaseValue}
Work Schedule Exemption: {WorkScheduleExemptionPercent}
Work Schedule Exemption Value: {WorkScheduleExemptionValue}
IRS Tax: {IrsTax}
Vacations Twelfth: {VacationsTwelfth}
Christmas Twelfth: {ChristmasTwelfth}
Other Expenses: {OtherExpenses}
Remote Work Allowance: {RemoteWorkAllowance}

Benefits Information
Number of Family Members: {NumInsuranceFamilyMember}
Comunication Plafond: {ComunicationPlafond}
Health Insurance: {HealthInsurance}

Deductions Information
Base Value Social Security: {BaseValueSocialSecurity}
Christmas Allowance Twelfth Social Security: {ChristmasAllowanceTwelfthSocialSecurity}
Vacations Allowance Twelfth Social Security: {VacationsAllowanceTwelfthSocialSecurity}
Base Value IRS: {BaseValueIrs}
Christmas Allowance Twelfth IRS: {ChristmasAllowanceIrs}
Vacations Allowance Twelfth IRS: {VacationsAllowanceIrs}

Values Information
Monthly Gross Value: {MonthlyGrossValue}
Monthly Net Value: {MonthlyNetValue}
Annual Gross Value: {AnnualGrossValue}
Annual Net Value: {AnnualNetValue}
Monthly Benefits: {MonthlyBenefits}
Annual Benefits: {AnnualBenefits}

Costs Information
Annual Cost: {AnnualCost}
Monthly Cost: {MonthlyCost}
Daily Cost: {DailyCost}
";
        }

    }
}
