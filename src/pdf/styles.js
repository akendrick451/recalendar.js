export function pageStyle( { alwaysOnSidebar, isLeftHanded } ) {
	return {
		flex: 1,
		width: '100%',
		height: '100%',
		flexGrow: 1,
		flexDirection: 'column',
		paddingLeft: alwaysOnSidebar && ! isLeftHanded ? 31 : 0,
		paddingRight: alwaysOnSidebar && isLeftHanded ? 31 : 0,
	};
}



export function gratitudeStyle() {
	return {
		// === NEW: Add these styles ===
			  gratitudeSection: {
				marginTop: 15,          // space after header
				marginBottom: 20,
				padding: 10,
				borderWidth: 1,
				borderColor: '#cccccc',
				borderStyle: 'dashed',  // subtle dashed box for visual cue
				borderRadius: 6,
			  },
			  questionText: {
				fontSize: 12,
				fontFamily: 'Helvetica-Bold', // or whatever bold font is registered
				marginBottom: 8,
				color: '#555555',
			  },
			  writingLine: {
				height: 1,
				backgroundColor: '#999999',
				marginVertical: 10,     // space between lines
				marginHorizontal: 5,
			  },
	

	};
}

export function bibleStyle() {
	return {

	border:'1px solid #cccccc',
    marginTop: 30,
    paddingTop: 15,
	

	

	};
}

export const content = {
	flex: 1,
	flexGrow: 1,
	borderTop: '1 solid black',
};
