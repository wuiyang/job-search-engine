import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';

const IMAGE_SIZE = 80;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
    minWidth: IMAGE_SIZE,
    maxWidth: IMAGE_SIZE,
    minHeight: IMAGE_SIZE,
    maxHeight: IMAGE_SIZE,
    marginRight: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10
  },
  logoText: {
    fontSize: 40,
    color: '#555'
  },
});

type CompanyLogoProps = {
  companyName: string,
  logoUrl?: string | null
}

function CompanyLogo(props: CompanyLogoProps) {
  const { companyName, logoUrl } = props;
  if (logoUrl != null && logoUrl.length > 0) {
    // for companies with logo, use Image
    return (<Image style={styles.image} source={{ uri: logoUrl }}></Image>);
  } else {
    // for companies without logo, use text
    return (
      <View style={styles.image}>
        <Text style={styles.logoText}>{companyName.charAt(0)}</Text>
      </View>
    );
  }
}

CompanyLogo.propTypes = {
  companyName: PropTypes.string.isRequired,
  logoUrl: PropTypes.string
};

CompanyLogo.defaultProps = {
  logoUrl: ''
}

export default CompanyLogo;