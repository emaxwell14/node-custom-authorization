class Policy {
    constructor({ id, amountInsured, email, inceptionDate, installmentPayment, clientId }) {
        this.id = id;
        this.amountInsured = amountInsured;
        this.email = email;
        this.inceptionDate = Date.parse(inceptionDate);
        this.installmentPayment = installmentPayment;
        this.clientId = clientId;
    }
}

module.exports = Policy;
