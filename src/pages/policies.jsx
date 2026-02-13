import React from 'react';
import './policies.css';

/**
 * A shared layout for all legal and policy pages
 */
const PolicyLayout = ({ title, children }) => (
    <div className="policy-container">
        <div className="policy-card">
            <h1>{title}</h1>
            <div className="policy-content">{children}</div>
            <button className="back-btn" onClick={() => window.history.back()}>
                Back to Preview
            </button>
        </div>
    </div>
);

/**
 * Terms and Conditions - Essential for Razorpay Audit
 */
export const Terms = () => (
    <PolicyLayout title="Terms & Conditions">
        <p>1. <strong>Agreement:</strong> By using Love Journey, you agree to provide accurate information to create your cinematic page.</p>
        <p>2. <strong>Content:</strong> Users must not upload illegal, offensive, or copyrighted material. We reserve the right to remove such content.</p>
        <p>3. <strong>Service:</strong> The ₹10 fee covers the generation and hosting of one unique cinematic URL for a period of 7 days.</p>
        <p>4. <strong>Support:</strong> For any technical issues, contact us via the WhatsApp link provided in the footer.</p>
    </PolicyLayout>
);

/**
 * Privacy Policy - Crucial for user data trust
 */
export const Privacy = () => (
    <PolicyLayout title="Privacy Policy">
        <p>1. <strong>Personal Data:</strong> We collect names, messages, and uploaded photos solely for the purpose of generating your personalized video page.</p>
        <p>2. <strong>Security:</strong> We do not share or sell your data to third parties. Payments are handled securely by Razorpay.</p>
        <p>3. <strong>Retention:</strong> To protect your privacy, all user-generated pages and data are automatically deleted from our servers after 7 days.</p>
    </PolicyLayout>
);

/**
 * Refund & Cancellation - Explaining the No-Refund Policy
 */
export const Refund = () => (
    <PolicyLayout title="Refund & Cancellation">
        <p>1. <strong>No Refunds:</strong> Since Love Journey provides an instant digital product (a generated link), <strong>all sales are final. We do not offer refunds or credits</strong> once the payment is successful.</p>
        <p>2. <strong>Cancellations:</strong> You cannot cancel an order once the payment is completed, as the link is generated immediately.</p>
        <p>3. <strong>Contact:</strong> If you face a technical error where the link was not generated after payment of ₹10, contact us at +91 79075 66244 with your payment ID.</p>
    </PolicyLayout>
);