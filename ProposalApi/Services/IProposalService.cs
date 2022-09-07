using ProposalApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProposalApi.Services
{
    public interface IProposalService
    {
        Task<Proposal> GetFinalProposal(Proposal proposal);
        Task SendFinalProposal(Proposal proposal);
    }
}
