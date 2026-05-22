/** Shared contact form grid + mobile layout (landing CTA + contact page). */
export const contactFormLayoutStyles = `
  .contact-form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    align-items: stretch;
  }
  .contact-form-section-title--spec { grid-area: spec-title; }
  .contact-form-section-title--contact { grid-area: contact-title; }
  .contact-form-area--left {
    grid-area: left-col;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }
  .contact-form-area--right {
    grid-area: right-col;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }
  .contact-form-area--services {
    flex: 0 0 auto;
  }
  .contact-form-area--fields {
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 0 0 auto;
  }
  .contact-form-area--details {
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-height: 0;
  }
  .contact-form-area--footer {
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 1 1 auto;
    min-height: 0;
    justify-content: flex-end;
  }
  @media (min-width: 769px) {
    .contact-form-grid {
      grid-template-areas:
        "spec-title contact-title"
        "left-col right-col";
    }
    .contact-form-area--left .contact-form-area--details {
      margin-top: 20px;
      flex: 1 1 auto;
    }
    .contact-form-area--left .contact-details-field {
      flex: 1 1 auto;
      min-height: 0;
      height: 100%;
      resize: none;
    }
  }
  @media (max-width: 768px) {
    .contact-form-section-title {
      display: none;
    }
    .contact-form-area--left,
    .contact-form-area--right {
      display: contents;
    }
    .contact-form-grid {
      grid-template-columns: 1fr;
      grid-template-areas:
        "services"
        "fields"
        "details"
        "footer";
      gap: 20px;
    }
    .contact-form-area--services { grid-area: services; }
    .contact-form-area--fields { grid-area: fields; }
    .contact-form-area--details { grid-area: details; }
    .contact-form-area--footer {
      grid-area: footer;
      justify-content: flex-start;
    }
    .contact-details-field {
      min-height: 112px;
      resize: vertical;
    }
    .contact-floating-input {
      padding: 16px !important;
    }
    .contact-floating-field.is-label-active .contact-floating-input {
      padding: 22px 16px 8px !important;
    }
    .contact-floating-field.is-label-active > .contact-floating-label {
      top: 6px !important;
    }
    .contact-service-trigger {
      min-height: 42px;
      padding: 10px 14px;
    }
    .contact-details-field {
      padding: 12px 14px;
      font-size: 15px;
    }
  }
`;
