const dev = {
  emailURL: 'https://c0mrk8va37.execute-api.us-east-1.amazonaws.com/dev/email/send',
  emailAddress: 'hannahstahl14@gmail.com',
};

const prod = {
  emailURL: 'https://aiikn63n03.execute-api.us-east-1.amazonaws.com/prod/email/send',
  emailAddress: 'samschieffer@gmail.com',
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  apiURL: 'https://8c1de13p.apicdn.sanity.io/v1/graphql/production/default',
  businessName: "Sam's Nature Photography",
  ...config,
};
