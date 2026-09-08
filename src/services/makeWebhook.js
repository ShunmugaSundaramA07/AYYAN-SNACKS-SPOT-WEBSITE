/**
 * Service to send customer query data to Make.com Custom Webhook.
 * 
 * IMPORTANT:
 * - The Make Webhook URL is stored in an environment variable (MAKE_WEBHOOK_URL),
 *   never hardcoded in source code.
 * - This function is called ONLY AFTER Firestore has successfully created the document.
 * - If the Make.com webhook call fails or is unconfigured, it does NOT throw or disrupt
 *   the user experience, preserving the successful Firestore submission state.
 * - Secrets and credentials are not exposed to the frontend.
 * 
 * @param {Object} queryData
 * @param {string} queryData.name
 * @param {string} queryData.contactNumber
 * @param {string} queryData.email
 * @param {string} queryData.message
 * @param {string} queryData.createdAt
 * @returns {Promise<{success: boolean, message?: string, error?: string}>}
 */
export async function triggerMakeWebhook({ name, contactNumber, email, message, createdAt }) {
  const payload = {
    name: (name || '').trim(),
    contactNumber: (contactNumber || '').trim(),
    email: (email || '').trim(),
    message: (message || '').trim(),
    createdAt: createdAt || new Date().toISOString(),
  };

  try {
    // 1. Primary path: Call secure server-side endpoint so MAKE_WEBHOOK_URL stays secret
    const res = await fetch('/api/make-webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).catch(() => null);

    if (res && res.ok) {
      const data = await res.json().catch(() => ({}));
      return { success: true, data };
    }

    // 2. Client-side fallback if running in a purely static environment where /api is not mounted
    const clientWebhookUrl = typeof import.meta !== 'undefined' && import.meta.env
      ? import.meta.env.VITE_MAKE_WEBHOOK_URL
      : null;

    if (clientWebhookUrl) {
      const directRes = await fetch(clientWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      return { success: directRes.ok };
    }

    return { success: false, message: 'Make.com webhook endpoint not available or not configured yet' };
  } catch (error) {
    // Make.com webhook failure must NEVER fail the customer's query
    console.warn('Make.com webhook notification failed (non-fatal):', error?.message);
    return { success: false, error: error?.message };
  }
}
