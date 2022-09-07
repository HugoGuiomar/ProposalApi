using ProposalApi.Context;
using ProposalApi.Models;
using ProposalApi.Utils;
using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Net.Mime;
using System.Threading.Tasks;

namespace ProposalApi.Services
{
    public class ProposalService : IProposalService
    {
        private readonly AppDbContext _context;

        public ProposalService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Proposal> GetFinalProposal(Proposal proposal)
        {
            return proposal;
        }

        public async Task SendFinalProposal(Proposal proposal)
        {
            String htmlTemplate = "<html><head><meta http-equiv=\"content-type\" content=\"text/html; charset=iso-8859-1\"/><title></title><style type=\"text/css\">@page { size: 8.27in 11.69in; margin-left: 0.18in; margin-right: 0.18in; margin-top: 0.18in; margin-bottom: 0.18in } p { line-height: 11%; text-align: left; orphans: 2; widows: 2; margin-bottom: 0.1in; direction: ltr; background: transparent } a:link { color: #0563c1; text-decoration: underline }</style></head><body lang=\"pt-PT\" link=\"#0563c1\" vlink=\"#800000\" dir=\"ltr\"><p style=\"margin-bottom: 0.11in\"><font size=\"4\" style=\"font-size: 16pt\"><span lang=\"en-US\"><b>General Information</b></span></font></p><p style=\"line-height: 100%; margin-bottom: 0in\"><span lang=\"en-US\">Name:&nbsp;" + proposal.Name + "</span></p><p style=\"line-height: 100%; margin-bottom: 0in\"><span lang=\"en-US\">Email:&nbsp;</span><font color=\"#0563c1\"><u><a href=\"mailto:" + proposal.Email + "\"><font face=\"Roboto, serif\"><span style=\"letter-spacing: 0.1pt\"><span lang=\"en-US\">" + proposal.Email + "</span></span></font></a></u></font></p><p style=\"line-height: 100%; margin-bottom: 0in\"><span lang=\"en-US\">Start Date:&nbsp;" + proposal.StartDate + "</span></p><p lang=\"en-US\" style=\"line-height: 100%; margin-bottom: 0in\"><br/></p><p style=\"line-height: 108%; margin-bottom: 0.11in\"><font size=\"4\" style=\"font-size: 16pt\"><span lang=\"en-US\"><b>Financial Information</b></span></font></p><p style=\"line-height: 100%; margin-bottom: 0in\"><span lang=\"en-US\">Base Value: &euro;" + proposal.BaseValue + "</span></p><p style=\"line-height: 100%; margin-bottom: 0in\"><span lang=\"en-US\">Work Schedule Exemption:&nbsp;" + proposal.WorkScheduleExemptionPercent + "%</span></p><p style=\"line-height: 100%; margin-bottom: 0in\"><span lang=\"en-US\">Work Schedule Exemption Value: &euro;" + proposal.WorkScheduleExemptionValue + "</span></p><p style=\"line-height: 100%; margin-bottom: 0in\"><span lang=\"en-US\">IRS Tax:&nbsp;" + proposal.IrsTax + "%</span></p> <p style=\"line-height: 100%; margin-bottom: 0in\"><span lang=\"en-US\">Vacations Twelfth: &euro;" + proposal.VacationsTwelfth + "</span></p><p style=\"line-height: 100%; margin-bottom: 0in\"><span lang=\"en-US\">Christmas Twelfth: &euro;" + proposal.ChristmasTwelfth + "</span></p><p style=\"line-height: 100%; margin-bottom: 0in\"><span lang=\"en-US\">Other Expenses: &euro;" + proposal.OtherExpenses + "</span></p><p style=\"line-height: 100%; margin-bottom: 0in\"><span lang=\"en-US\">Remote Work Allowance: &euro;" + proposal.RemoteWorkAllowance + "</span></p><p lang=\"en-US\" style=\"line-height: 100%; margin-bottom: 0in\"><br/></p><p style=\"line-height: 108%; margin-bottom: 0.11in\"><font size=\"4\" style=\"font-size: 16pt\"><span lang=\"en-US\"><b>Benefits Information</b></span></font></p><p style=\"line-height: 100%; margin-bottom: 0in\">Number of Family Members:&nbsp;" + proposal.NumInsuranceFamilyMember + "</p><p style=\"line-height: 100%; margin-bottom: 0in\">Comunication Plafond: &euro;" + proposal.ComunicationPlafond + "</p><p style=\"line-height: 100%; margin-bottom: 0in\">Health Insurance: &euro;" + proposal.HealthInsurance + "</p><p style=\"line-height: 100%; margin-bottom: 0in\"><br/></p><p style=\"line-height: 108%; margin-bottom: 0.11in\"><font size=\"4\" style=\"font-size: 16pt\"><span lang=\"en-US\"><b>Deductions Information</b></span></font></p><p style=\"line-height: 100%; margin-bottom: 0in\"><span lang=\"en-US\">Base Value Social Security: &euro;" + proposal.BaseValueSocialSecurity + "</span></p><p style=\"line-height: 100%; margin-bottom: 0in\"><span lang=\"en-US\">Christmas Allowance Twelfth Social Security: &euro;" + proposal.ChristmasAllowanceTwelfthSocialSecurity + "</span></p><p style=\"line-height: 100%; margin-bottom: 0in\"><span lang=\"en-US\">Vacations Allowance Twelfth Social Security: &euro;" + proposal.VacationsAllowanceTwelfthSocialSecurity + "</span></p><p style=\"line-height: 100%; margin-bottom: 0in\"><span lang=\"en-US\">Base Value IRS: &euro;" + proposal.BaseValueIrs + "</span></p><p style=\"line-height: 100%; margin-bottom: 0in\"><span lang=\"en-US\">Christmas Allowance Twelfth IRS: &euro;" + proposal.ChristmasAllowanceIrs + "</span></p><p style=\"line-height: 100%; margin-bottom: 0in\"><span lang=\"en-US\">Vacations Allowance Twelfth IRS: &euro;" + proposal.VacationsAllowanceIrs + "</span></p><p lang=\"en-US\" style=\"line-height: 100%; margin-bottom: 0in\"><br/></p><p style=\"line-height: 108%; margin-bottom: 0.11in\"><font size=\"4\" style=\"font-size: 16pt\"><span lang=\"en-US\"><b>Values Information</b></span></font></p><p style=\"line-height: 100%; margin-bottom: 0in\"><span lang=\"en-US\">Monthly Gross Value: &euro;" + proposal.MonthlyGrossValue + "</span></p><p style=\"line-height: 100%; margin-bottom: 0in\"><span lang=\"en-US\">Monthly Net Value: &euro;" + proposal.MonthlyNetValue + "</span></p><p style=\"line-height: 100%; margin-bottom: 0in\"><span lang=\"en-US\">Annual Gross Value: &euro;" + proposal.AnnualGrossValue + "</span></p><p style=\"line-height: 100%; margin-bottom: 0in\"><span lang=\"en-US\">Annual Net Value: &euro;" + proposal.AnnualNetValue + "</span></p><p style=\"line-height: 100%; margin-bottom: 0in\"><span lang=\"en-US\">Monthly Benefits: &euro;" + proposal.MonthlyBenefits + "</span></p><p style=\"line-height: 100%; margin-bottom: 0in\"><span lang=\"en-US\">Annual Benefits: &euro;" + proposal.AnnualBenefits + "</span></p><p lang=\"en-US\" style=\"line-height: 100%; margin-bottom: 0in\"><br/></p><p style=\"line-height: 108%; margin-bottom: 0.11in\"><font size=\"4\" style=\"font-size: 16pt\"><span lang=\"en-US\"><b>Costs Information</b></span></font></p><p style=\"line-height: 100%; margin-bottom: 0in\"><span lang=\"en-US\">Annual Cost: &euro;" + proposal.AnnualCost + "</span></p><p style=\"line-height: 100%; margin-bottom: 0in\"><span lang=\"en-US\">Monthly Cost: &euro;" + proposal.MonthlyCost + "</span></p><p style=\"line-height: 100%; margin-bottom: 0in\"><span lang=\"en-US\">Daily Cost: &euro;" + proposal.DailyCost + "</span></p><p style=\"line-height: 108%; margin-bottom: 0.11in\"><br/><br/></p></body></html>";


            var stream = proposal.ToPdfStream();

            ContentType pdfContentType = new ContentType(MediaTypeNames.Application.Pdf);
            Attachment attachment = new Attachment(stream, pdfContentType);
            attachment.ContentDisposition.FileName = "FinalProposal.pdf";
            

            MailSender.SendMail(proposal.Email, "Final Proposal", htmlTemplate, true, new List<Attachment> { attachment });
            stream.Close();
        }
    }
}
