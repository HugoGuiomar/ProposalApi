using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProposalApi.Models;
using ProposalApi.Services;
using System;
using System.Threading.Tasks;

namespace ProposalApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class ProposalController : ControllerBase
    {
        private IProposalService _proposalService;

        public ProposalController(IProposalService proposalService)
        {
            _proposalService = proposalService;
        }

        /// <summary>
        /// Create the proposal.
        /// </summary>
        /// <param name="proposalRequest">Form with all form inputs</param>
        /// <returns>
        /// Calculated propose
        /// </returns>
        [HttpPost("CreateFinalProposal")]
        public async Task<ActionResult> CreateFinalProposal([FromForm] Proposal proposalRequest)
        {
            try
            {
                Proposal finalProposal = await _proposalService.GetFinalProposal(proposalRequest);
                return Ok(finalProposal);
            }
            catch(Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {e.Message}");
            }
        }

        /// <summary>
        /// Submit/send email with the proposal.
        /// </summary>
        /// <param name="proposalRequest">Values to be sended</param>
        /// <returns>
        /// </returns>
        [HttpPost("SendFinalProposal")]
        public async Task<ActionResult> SendFinalProposal([FromBody] Proposal proposalRequest)
        {
            try
            {
                await _proposalService.SendFinalProposal(proposalRequest);
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {e.Message}");
            }
        }

    }
}
