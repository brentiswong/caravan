import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  scriptToOps,
  scriptToHex,
  networkLabel,
  multisigAddressType,
  multisigRedeemScript,
  multisigWitnessScript,
  multisigRequiredSigners,
  multisigTotalSigners,
  blockExplorerAddressURL,
} from 'unchained-bitcoin';
import {
  wrapText,
  externalLink,
} from "../utils";

// Components
import Copyable from "./Copyable";
import { Typography, Grid, Box, Chip} from '@material-ui/core';
import { OpenInNew } from '@material-ui/icons';

class MultisigDetails extends React.Component {

  static propTypes = {
    network:  PropTypes.string.isRequired,
    multisig: PropTypes.object.isRequired,
  };

  render() {
    const {network, multisig} = this.props;
    const address = multisig.address;
    const redeemScript = multisigRedeemScript(multisig);
    const witnessScript = multisigWitnessScript(multisig);
    return (
      <Box mt={2}>

        <Typography variant="h6">Address</Typography>

        <Typography align="center" variant="h5">

          <Grid container direction="column" spacing={2}>

            <Grid item>
              <Copyable text={address}>
                <code>{address}</code>
              </Copyable>
              &nbsp;
              {externalLink(blockExplorerAddressURL(address, network), <OpenInNew />)}
            </Grid>

            <Grid item justify="center" container spacing={3}>

              <Grid item>
                <Chip label="BTC" />
              </Grid>

              <Grid item>
                <Chip label={networkLabel(network)}/>
              </Grid>

              <Grid item>
                <Chip label={`${multisigRequiredSigners(multisig)}-of-${multisigTotalSigners(multisig)}`}/>
              </Grid>

              <Grid item>
                <Chip label={multisigAddressType(multisig)}/>
              </Grid>

            </Grid>
          </Grid>

        </Typography>

        {this.renderScript("Script", multisig)}
        {redeemScript && this.renderScript("Redeem Script", redeemScript)}
        {witnessScript && this.renderScript("Witness Script", witnessScript)}
      </Box>
    );
  }

  renderScript = (name, script) => {
    const hex = scriptToHex(script);
    const ops = scriptToOps(script);
    return (
      <Box mt={2}>
        <Typography variant="h6">{name}</Typography>
        <Grid container>
          <Grid item sm={6}>
            <Copyable text={hex}><code>{wrapText(hex, 48)}</code></Copyable>
          </Grid>
          <Grid item sm={6}>
            <Copyable text={ops}><code>{wrapText(ops, 48)}</code></Copyable>
          </Grid>
        </Grid>
      </Box>
    );
  }

}

function mapStateToProps(state) {
  return state.settings;
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(MultisigDetails);
