import React from 'react';
import BlockContent from '@sanity/block-content-to-react';

const serializers = {
  types: {
    code: ({ node }) => (
      <pre data-language={node.language}>
        <code>{node.code}</code>
      </pre>
    ),
  },
};

const PortableText = ({ text }) => (
  <BlockContent blocks={text} serializers={serializers} />
);

export default PortableText;
