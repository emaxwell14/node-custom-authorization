/**
 * Model object for policy
 */
class Policy {
    constructor({ id, amountInsured, email, inceptionDate, installmentPayment, clientId }) {
        this.id = id;
        this.amountInsured = amountInsured;
        this.username = email; // username in this domain
        this.inceptionDate = Date.parse(inceptionDate);
        this.installmentPayment = installmentPayment;
        this.userId = clientId; // user in this domain
    }
}

module.exports = Policy;
