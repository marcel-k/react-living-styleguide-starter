import React from 'react';
const ThFirst = ({ children }) => <th style={{ border: '1px solid grey' }}>{children}</th>
const Th = ({ children }) => <th style={{ border: '1px solid grey', borderLeft: 'none' }}>{children}</th>
const TdFirst = ({ children }) => <td style={{ border: '1px solid lightgrey', borderTop: 'none' }}>{children}</td>
const Td = ({ children }) => <td style={{ borderRight: '1px solid lightgrey', borderBottom: '1px solid lightgrey' }}>{children}</td>

export const TableComponent = ({ propDefinitions }) => {

  if(!propDefinitions || propDefinitions.length === 0) {
    return 'No properties found'
  }

  const props = propDefinitions.map(
    ({ property, propType, required, description, defaultValue }) => {
      return (
        <tr key={property}>
          <TdFirst>{property}</TdFirst>
          <Td>{propType.name}</Td>
          <Td>{required ? 'true' : 'false'}</Td>
          <Td>{defaultValue}</Td>
          <Td>{description}</Td>
        </tr>
      );
    }
  );

  return (
    <table cellPadding="8" cellSpacing='0' style={{ textAlign: 'left' }}>
      <thead>
        <tr>
          <ThFirst>property</ThFirst>
          <Th>type</Th>
          <Th>required</Th>
          <Th>default</Th>
          <Th>description</Th>
        </tr>
      </thead>
      <tbody>{props}</tbody>
    </table>
  );
};