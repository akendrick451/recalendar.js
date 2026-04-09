export function pageStyle({ alwaysOnSidebar, isLeftHanded }) {
  return {
    flex: 1,
    width: '100%',
    height: '100%',
    flexGrow: 1,
    flexDirection: 'column',
    paddingLeft: alwaysOnSidebar && !isLeftHanded ? 31 : 0,
    paddingRight: alwaysOnSidebar && isLeftHanded ? 31 : 0,
  };
}

export function gratitudeStyle() {
  return {
    gratitudeSection: {
      marginTop: '15px',
      marginBottom: '20px',
      padding: '10px',
      borderRadius: '6px',
    },
    questionText: {
      fontSize: '12px',
      marginBottom: '8px',
      color: '#171817',
    },
    writingLine: {
      height: '1px',
      backgroundColor: '#8ff75f',
      margin: '10px 5px',
    },
  };
}

export function dayPage2() {
 return{
			dayRow: {
			flexDirection: 'row',
		},
		// Individual columns
		dayColumn50: {
		width: '50%',
			padding: 10,
		},
		dayColumn1: {
		width: '66%',
			padding: 10,
		},
			dayColumn2: {
			width: '33%',
			padding: 10,
		},
		// The inner rows for Column 1
    innerRow: {
      flex: 1, // Optional: makes rows share the height equally
      marginBottom: 10, // Space between the two rows
    },
	};
}

export function dayStyle() {
  return {
    dayStyle: {
      padding: '10px',
    },
  };
}

export function quoteStyle() {
  return {
    quoteStyle: {
      border: '2px solid #cccccc',
      marginTop: '30px',
      paddingTop: '15px',
      fontSize: '16px',
      fontStyle: 'italic',
      textAlign: 'center',
    },
  };
}

export function bibleStyle() {
  return {
    bibleStyle: {
      marginTop: '30px',
      paddingTop: '15px',
      fontStyle: 'italic',
    },
  };
}

export const content = {
  flex: 1,
  flexGrow: 1,
  borderTop: '2px solid green',
};

export function lineBreak(height = 15) {
  return {
    lineBreak: {
      height: height,        // controls how much space you want
      // or use marginTop / marginBottom instead
    },
  };
}

export function writingInputLines() {
  return {
	row: {
	flexDirection: 'row',
	alignItems: 'flex-end',
	marginBottom: 12,           // space between each row
	},

	promptText: {
	fontSize: 11,
	color: '#333',
	marginRight: 12,
	width: 90,                  // ← This is the key! Fixed width
	textAlign: 'left',
	},

	underlineContainer: {
	flex: 1,
	position: 'relative',
	},

	underline: {
	position: 'absolute',
	bottom: 1,
	left: 0,
	right: 0,
	height: 1,
	backgroundColor: '#8ff75f',
	},

	writingText: {
	fontSize: 11,
	paddingBottom: 2,
	},
};
}