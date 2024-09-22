import React from 'react'

function FruadWarning() {
    return (
        <div className=' dark:text-black'>
            <ol type='a' className=' space-y-3 text-base'>
                <li>1. All users are strongly advised to exercise utmost caution when engaging in business transactions with individuals, body corporates, or companies from any part of the world.</li>
                <li>2. Users are urged to exercise caution when transacting with buyers or sellers on the Site, conducting interactions after thorough diligence. The Company, its directors, employees, officers, or agents are not liable for any illegal or fraudulent transactions.</li>
                <li>3. Users are cautioned against sending advance money or products unless they have confirmed cash in their account or obtained an irrevocable letter of credit from the buyer, duly authorized by the buyer&epos;s bank.</li>
                <li>4. Users are advised against conducting business transactions unless full payment is received before shipping the products.</li>
            </ol>
            <div className=' bg-slate-100 rounded-md p-6 mt-4 space-y-3'>
                <p className=' text-lg'>1. Beware of OTP (One-Time Password) fraud transactions. Do not share your OTP or personal banking details with anyone claiming to represent financial institutions, as this information can be used for fraudulent transactions without your consent.</p>
                <p className=' text-lg'>2. To avoid bank draft scams, be cautious if receiving bank drafts with unauthorized bank name printing. Prior to shipping any product or providing a partial cash advance, wait for the bank to clear the bank draft/check.</p>
                <p className=' text-lg'>3. To prevent credit card scams, upon receiving an online order paid by credit card, it is advisable to request a written Credit Card Authorization via fax. Verify the validity of the Credit Card with your bank or directly contact VISA, Mastercard, or American Express. Refrain from shipping any goods until the credit card&apos;s validity is confirmed.</p>
                <p className=' text-lg'>4. To prevent registration/license/tender fee scams, exercise caution if an offer demands a payment for registration or tender fees before purchasing a large quantity of goods. Some fraudulent schemes involve posting offers to buy substantial quantities of items, requiring payment for legal and tender fees after bid submission. Refrain from paying any fees and avoid shipping computers or other products unless you have confirmed cash in your account validated by your bank.</p>
                <p className=' text-lg'>5. Be wary of advance payment scams through payment platforms like GPay, Paytm, or PhonePe. Avoid making advance payments to unknown entities or for suspicious transactions, as these could be potential scams resulting in financial loss.</p>
            </div>
        </div>
    )
}

export default FruadWarning