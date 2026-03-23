import { Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import dayjs from 'dayjs/esm';
import PropTypes from 'prop-types';
import React from 'react';

import MiniCalendar, { HIGHLIGHT_NONE } from '~/pdf/components/mini-calendar';
import PdfConfig from '~/pdf/config';
import { yearOverviewLink } from '~/pdf/lib/links';

class TitlePage extends React.Component {
	styles = StyleSheet.create( {
		year: {
			fontSize: 48,
			fontWeight: 'bold',
			textAlign: 'center',
		},
		
	} );

	render() {
		const { config, startDate } = this.props;
		return (
			<Page id={ yearOverviewLink() } size={ config.pageSize } dpi={ config.dpi }>
				<Text style={ this.styles.year }>{startDate.year()}</Text>
				
			</Page>
		);
	}
}

TitlePage.propTypes = {
	config: PropTypes.instanceOf( PdfConfig ).isRequired,
	startDate: PropTypes.instanceOf( dayjs ).isRequired,

};

export default TitlePage;
