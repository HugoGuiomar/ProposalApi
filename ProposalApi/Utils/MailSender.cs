using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;

namespace ProposalApi.Utils
{
    public class MailSender
    {
        public static void SendMail(String toMail, String emailSubject, String emailBody, Boolean isBodyHtml, IEnumerable<Attachment> attachments)
        {
            SmtpClient client = new SmtpClient("smtp-mail.outlook.com");

            client.Port = 587;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;
            NetworkCredential credentials = new NetworkCredential("proposal.development.test@outlook.pt", "proposalDevel0pment");
            client.EnableSsl = true;
            client.Credentials = credentials;


            MailMessage mail = new MailMessage("proposal.development.test@outlook.pt", toMail);
            mail.Subject = emailSubject;
            mail.Body = emailBody;
            mail.IsBodyHtml = isBodyHtml;

            foreach (var attachment in attachments)
            {
                mail.Attachments.Add(attachment);
            }

            client.Send(mail);
        }
    }
}
