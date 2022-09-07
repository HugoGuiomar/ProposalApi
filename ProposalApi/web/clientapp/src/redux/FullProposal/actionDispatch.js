import * as proposalActions from './actionTypes';

/**
 * 
 * @param {object} payload 
 * @returns callback in fullProposalReducer.js
 */
 export function setFullProposal(payload) {
    // console.log("action dispatch payload ",payload);
    return {
        type: proposalActions.SET_FULL_PROPOSAL,
        payload
    }
}