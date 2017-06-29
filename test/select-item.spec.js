import React from 'react';
import SelectItemComponent from '../src/select-item';
import TestUtils from 'react-addons-test-utils';
import objectAssign from 'object-assign';

const SelectItem = React.createFactory(SelectItemComponent);

describe('SelectItem component', function () {

  let selectItem;
  const testOptions = [
    { value: 'red', label: 'Red' },
    { value: 'green', label: 'Green' },
    { value: 'blue', label: 'Blue' },
  ];
  const defaultProps = {
    label: 'foo',
    value: null,
    onChange: function () {
    }
  };
  let childrens;

  function setProps(props, callback) {
    let readyProps = [ objectAssign({}, defaultProps[ 0 ], props), childrens ];
    selectItem = TestUtils.renderIntoDocument(SelectItem.apply(null, readyProps));
    return callback()
  }

  beforeEach(function () {
    childrens = testOptions.map(function (option) {
      return React.DOM.option({ value: option.value }, option.label)
    });

    let args = childrens.slice();
    args.unshift(defaultProps);

    selectItem = TestUtils.renderIntoDocument(SelectItem.apply(null, args))
  });

  it('should render the label when no value is selected', function () {
    let label = TestUtils.scryRenderedDOMComponentsWithClass(
      selectItem,
      'react-select-item-label'
    );
    label.should.have.length(1);
    label[ 0 ].textContent.should.equal(selectItem.props.label)
  });

  it('should render the label for the selected value', function (done) {
    setProps({ value: testOptions[ 0 ].value }, function () {
      let label = TestUtils.scryRenderedDOMComponentsWithClass(
        selectItem,
        'react-select-item-label'
      );
      label.should.have.length(1);
      label[ 0 ].textContent.should.equal(testOptions[ 0 ].label);
      done()
    })
  });

  it('should not render the clear button with no value selected', function (done) {
    setProps({ value: null }, function () {
      let clear = TestUtils.scryRenderedDOMComponentsWithClass(
        selectItem,
        'react-select-item-clear'
      );
      clear.should.have.length(0);
      done()
    })
  });


  it('should render the clear button with a selected value', function (done) {
    setProps({ value: testOptions[ 0 ].value }, function () {
      let clear = TestUtils.scryRenderedDOMComponentsWithClass(
        selectItem,
        'react-select-item-clear'
      );
      clear.should.have.length(1);
      done()
    })
  });

  it('should add hidden class to options when state.open is false', function (done) {
    selectItem.setState({ open: false }, function () {
      let options = TestUtils.scryRenderedDOMComponentsWithClass(
        selectItem,
        'react-select-item-options'
      );
      options.should.have.length(1);
      options[ 0 ].className.should.match(/hidden/);
      done()
    })
  });

  it('should render options', function (done) {
    selectItem.setState({ open: true }, function () {
      let options = TestUtils.scryRenderedDOMComponentsWithClass(
        selectItem,
        'react-select-item-options'
      );
      options.should.have.length(1);
      done()
    })
  });

  it('should show an option for each option in props.options', function (done) {
    selectItem.setState({ open: true }, function () {
      let options = TestUtils.scryRenderedDOMComponentsWithClass(
        selectItem,
        'react-select-item-option'
      );
      options.should.have.length(options.length);
      options.forEach(function (option, i) {
        option.textContent.should.equal(testOptions[ i ].label)
      });
      done()
    })
  });

  describe("Toggle options list open/closed when select box is clicked", function () {
    let selectItemElement;

    beforeEach(function () {
      selectItemElement = TestUtils.findRenderedDOMComponentWithClass(
        selectItem,
        'react-select-item'
      )
    });

    it('should close options list when select box is clicked on (if options list is already open)', function (done) {
      // Start with open options list
      selectItem.setState({ open: true }, function () {
        // Simulate a click on the select box (element with class tag `react-select-item`)
        TestUtils.Simulate.click(selectItemElement)
        // Re-render component (to ensure state change occured)
        selectItem.forceUpdate(function () {
          // Check if it is closed
          selectItem.state.open.should.equal(false);
          // End test
          done()
        })
      })
    });

    it('should open options list when select box is clicked on (if options list is closed)', function (done) {
      // Start with closed options list
      selectItem.setState({ open: false }, function () {
        // Simulate a click on the select box (element with class tag `react-select-item`)
        TestUtils.Simulate.click(selectItemElement);
        // Re-render component (to ensure state change occured)
        selectItem.forceUpdate(function () {
          // Check if it is open
          selectItem.state.open.should.equal(true);
          // End test
          done()
        })
      })
    })

  })
});
