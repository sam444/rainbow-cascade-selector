import { UIDialog, Param, UIDataTable, UIBox, UIColumn, UIButton, OnChangeEvent, CodeTable, UIMessageHelper, KeyValue, UIEvent, Component } from "rainbowui-core";
import PropTypes from 'prop-types';
import { ELUtil, StringUtil } from 'rainbow-foundation-tools'
import "../css/cascade.css"

//-----------------------------------------------------------------------------------------------
//	date: 2016/05/20
//
//	author: wu.jiang
//
//	description: cascadeSelector Class
//-----------------------------------------------------------------------------------------------
export default class cascadeSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showFirstLevel: true,
            showSecondLevel: false,
            showThirdLevel: false,
            showFourthLevel: false,
            showFifthLevel: false,
            firstStateItems: ""

        };
        this.currInfo = {
            "currentLevel": 1,
            "firstLevelId": 0,
            "firstLevelName": "",
            "secondLevelId": 0,
            "secondLevelName": "",
            "thirdLevelId": 0,
            "thirdLevelName": "",
            "fourthLevelId": 0,
            "fourthLevelName": "",
            "fifthLevelId": 0,
            "fifthLevelName": ""
        };

        this.firstLevelItems = [];
        this.secondLevelItems = [];
        this.thirdLevelItems = [];
        this.fourthLevelItems = [];
        this.fifthLevelItems = [];
        this.componentId = this.props.id
        // this.componentId = this.props.id ? this.props.id : this.generateId();
    }

    componentDidMount() {
        super._componentDidMount();

        this.initEvent();
        this.initProperty();

        UIEvent.initEventListener(this);

        this.getFirstLevelItems()
        // UpdateContext.put(this.componentId, this);
    }


    renderComponent() {
        let styleClassArray = this.getStyleClassArray();

        return (
            <div className="form-group">
                <label className={styleClassArray[0] + " control-label"}>
                    {this.props.label}
                </label>

                <div className={styleClassArray[1]} style={{ padding: "5px" }}>
                    <div>
                        <div id={this.componentId + "-list"} className="list" style={{ width: "620px" }}>
                            <div id={this.componentId + "-summary-stock"} className="summary-stock">
                                {this.renderCascadeDisplayArea()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderCascadeDisplayArea() {
        return (
            <div id={this.componentId} className="dd">
                <div id={this.componentId + "-store-selector"} className="store-selector" >
                    <div className="text">
                        <div id={this.componentId + "-cascade-detail"}>{i18n.BlankOption}</div>
                        <b></b>
                    </div>
                    <div className="content" style={{ display: "none" }}>
                        <div data-widget="tabs" className="m JD-stock" id={this.componentId + "-JD-stock"}>
                            <button type="button" className="close" onClick={this.onClickSelector.bind(this)} style={{position: "static"}}>&times;</button>
                            <div className="mt">
                                <ul className="tab">
                                    <li data-index="0" id={this.componentId + "-first-level-selector"} data-widget="tab-item" className="curr">
                                        <a href="javascript:void (0);" className="hover" onClick={this.onClickFirstLevelSelector.bind(this)}><em>{i18n.BlankOption}</em><i></i></a>
                                    </li>
                                    <li data-index="1" id={this.componentId + "-second-level-selector"} data-widget="tab-item" style={{ display: "none" }}>
                                        <a href="javascript:void (0);" className="" onClick={this.onClickSecondLevelSelector.bind(this)}><em>{i18n.BlankOption}</em><i></i></a>
                                    </li>
                                    <li data-index="2" id={this.componentId + "-third-level-selector"} data-widget="tab-item" style={{ display: "none" }}>
                                        <a href="javascript:void (0);" className="" onClick={this.onClickThirdLevelSelector.bind(this)}><em>{i18n.BlankOption}</em><i></i></a>
                                    </li>
                                    <li data-index="3" id={this.componentId + "-fourth-level-selector"} data-widget="tab-item" style={{ display: "none" }}>
                                        <a href="javascript:void (0);" className="" onClick={this.onClickFourthLevelSelector.bind(this)}><em>{i18n.BlankOption}</em><i></i></a>
                                    </li>
                                    <li data-index="4" id={this.componentId + "-fifth-level-selector"} data-widget="tab-item" style={{ display: "none" }}>
                                        <a href="javascript:void (0);" className="" onClick={this.onClickFifthLevelSelector.bind(this)}><em>{i18n.BlankOption}</em><i></i></a>
                                    </li>
                                </ul>
                                <div className="stock-line"></div>
                            </div>
                            <div className="mc" data-area="0" data-widget="tab-content" id={this.componentId + "-stock-first-level-items"}>
                                {this.state.showFirstLevel ? this.state.firstStateItems : null}
                            </div>
                            <div className="mc" data-area="1" data-widget="tab-content" id={this.componentId + "-stock-second-level-items"}>
                                {this.state.showSecondLevel ? this.getSecondLevelItems() : null}
                            </div>
                            <div className="mc" data-area="2" data-widget="tab-content" id={this.componentId + "-stock-third-level-items"}>
                                {this.state.showThirdLevel ? this.getThirdLevelItems() : null}
                            </div>
                            <div className="mc" data-area="3" data-widget="tab-content" id={this.componentId + "-stock-fourth-level-items"}>
                                {this.state.showFourthLevel ? this.getFourthLevelItems() : null}
                            </div>
                            <div className="mc" data-area="4" data-widget="tab-content" id={this.componentId + "-stock-fifth-level-items"}>
                                {this.state.showFifthLevel ? this.getFifthLevelItems() : null}
                            </div>
                        </div>
                    </div>
                    <div onClick={this.onClickSelector.bind(this)} className="close"></div>
                </div>
                <div id={this.componentId + "-store-prompt"} className="store-prompt"><strong></strong></div>
            </div>
        );
    }

    initEvent() {
        $("#" + this.componentId + "-store-selector").unbind("mouseover");
        $("#" + this.componentId + "-store-selector").bind("mouseover", event => {
            $("#" + this.componentId + "-store-selector").addClass("hover");
            $("#" + this.componentId + "-store-selector .content, #" + this.componentId + "-JD-stock").show();
        });

        // $("#" + this.componentId + "-store-selector").unbind("mouseout");
        // $("#" + this.componentId + "-store-selector").bind("mouseout", event => {
        //     $("#" + this.componentId + "-store-selector").removeClass("hover");
        //     $("#" + this.componentId + "-store-selector .content, #" + this.componentId + "-JD-stock").hide();
        // });

        $("#" + this.componentId + "-cascade-detail").unbind("DOMSubtreeModified");
        $("#" + this.componentId + "-cascade-detail").bind("DOMSubtreeModified", event => {
            this.setComponentValue(event);
        });

    }

    initProperty() {
        this.initValue();
    }

    initValue() {
        this.getComponentValue();
    }

    setComponentValue(event) {
        this.setValue(this.props.value, this.currInfo);
    }

    setValue(value, currInfo) {
        if (ELUtil.isEL(value)) {
            value = ELUtil.getELContent(value);
            try {
                eval(value + "=" + '\'' + currInfo + '\'');
            } catch (e) {
                let index = value.indexOf('.');
                let prefix = value.substr(0, index);
                let suffix = null;
                //model[0].a.b || model.a.b
                if (prefix.indexOf("[") != -1) {
                    let i = prefix.indexOf("[");
                    prefix = value.substr(0, i);//model[0]
                    suffix = value.substr(i, value.length);//.a.b
                } else {
                    suffix = value.substr(index + 1, value.length);//a.b
                    suffix = "." + suffix;//.a.b
                }
                console.log(prefix);
                let contextModel = DataContext.get(prefix);
                console.log(contextModel);
                for (var prop in currInfo) {
                    eval("contextModel" + suffix + "." + prop + "=" + '\'' + currInfo[prop] + '\'');
                }
            }
        }
    }

    getComponentValue() {
        const value = this.getValue(this.props.value);
        if (value != null && value != undefined) {
            this.currInfo = value;
            this.secondLevelItems = this.props.datasource(this.props.codeTableArr, this.currInfo.firstLevelId);
            this.thirdLevelItems = this.props.datasource(this.props.codeTableArr, this.currInfo.firstLevelId, this.currInfo.secondLevelId);
            this.fourthLevelItems = this.props.datasource(this.props.codeTableArr, this.currInfo.firstLevelId, this.currInfo.secondLevelId,
                this.currInfo.thirdLevelId);
            this.fifthLevelItems = this.props.datasource(this.props.codeTableArr, this.currInfo.firstLevelId, this.currInfo.secondLevelId,
                this.currInfo.thirdLevelId, this.currInfo.fourthLevelId);
            switch (this.currInfo.currentLevel) {
                case "1":
                    this.onClickFirstLevelSelector();
                    $("#" + this.componentId + "-first-level-selector").find("em").html(this.currInfo.firstLevelName);
                    break;
                case "2":
                    $("#" + this.componentId + "-first-level-selector").find("em").html(this.currInfo.firstLevelName);
                    $("#" + this.componentId + "-second-level-selector").find("em").html(this.currInfo.secondLevelName);
                    this.onClickSecondLevelSelector();

                    break;
                case "3":
                    $("#" + this.componentId + "-first-level-selector").find("em").html(this.currInfo.firstLevelName);
                    $("#" + this.componentId + "-second-level-selector").find("em").html(this.currInfo.secondLevelName);
                    $("#" + this.componentId + "-third-level-selector").find("em").html(this.currInfo.thirdLevelName);
                    this.onClickThirdLevelSelector();

                    break;
                case "4":
                    $("#" + this.componentId + "-first-level-selector").find("em").html(this.currInfo.firstLevelName);
                    $("#" + this.componentId + "-second-level-selector").find("em").html(this.currInfo.secondLevelName);
                    $("#" + this.componentId + "-third-level-selector").find("em").html(this.currInfo.thirdLevelName);
                    $("#" + this.componentId + "-fourth-level-selector").find("em").html(this.currInfo.fourthLevelName);
                    this.onClickFourthLevelSelector();
                    break;
                case "5":
                    $("#" + this.componentId + "-first-level-selector").find("em").html(this.currInfo.firstLevelName);
                    $("#" + this.componentId + "-second-level-selector").find("em").html(this.currInfo.secondLevelName);
                    $("#" + this.componentId + "-third-level-selector").find("em").html(this.currInfo.thirdLevelName);
                    $("#" + this.componentId + "-fourth-level-selector").find("em").html(this.currInfo.fourthLevelName);
                    $("#" + this.componentId + "-fifth-level-selector").find("em").html(this.currInfo.fifthLevelName);
                    this.onClickFifthLevelSelector();
                    break;
                default:
                    break;
            }

            if (!$.isEmptyObject(this.currInfo)) {
                $("#" + this.componentId + "-cascade-detail").html(this.currInfo.firstLevelName + this.currInfo.secondLevelName +
                    this.currInfo.thirdLevelName + this.currInfo.fourthLevelName + this.currInfo.fifthLevelName);
            }
        }
    }

    getValue(value) {
        let inputValue = null;
        if (ELUtil.isEL(value)) {
            value = ELUtil.getELContent(value);
            try {
                inputValue = eval(value);
            } catch (e) {
                let index = value.indexOf('.');
                let prefix = value.substr(0, index);
                let suffix = null;
                if (prefix.indexOf("[") != -1) {
                    let i = prefix.indexOf("[");
                    prefix = value.substr(0, i);
                    suffix = value.substr(i, value.length);
                } else {
                    suffix = value.substr(index + 1, value.length);
                    suffix = "." + suffix;
                }

                let contextModel = DataContext.get(prefix);
                if (contextModel != undefined) {
                    inputValue = eval("contextModel" + suffix);
                }
            }
        }

        return inputValue;
    }

    onClickFirstLevelSelector() {
        this.setState(
            {
                showFirstLevel: true,
                showSecondLevel: false,
                showThirdLevel: false,
                showFourthLevel: false,
                showFifthLevel: false
            }
        );

        $("#" + this.componentId + "-first-level-selector").addClass("curr").css("display", "");
        $("#" + this.componentId + "-second-level-selector").removeClass("curr").css("display", "none");
        $("#" + this.componentId + "-third-level-selector").removeClass("curr").css("display", "none");
        $("#" + this.componentId + "-fourth-level-selector").removeClass("curr").css("display", "none");
        $("#" + this.componentId + "-fifth-level-selector").removeClass("curr").css("display", "none");
    }

    onClickSecondLevelSelector() {
        this.setState(
            {
                showFirstLevel: false,
                showSecondLevel: true,
                showThirdLevel: false,
                showFourthLevel: false,
                showFifthLevel: false
            }
        );

        $("#" + this.componentId + "-first-level-selector").removeClass("curr").css("display", "");
        $("#" + this.componentId + "-second-level-selector").addClass("curr").css("display", "");
        $("#" + this.componentId + "-third-level-selector").removeClass("curr").css("display", "none");
        $("#" + this.componentId + "-fourth-level-selector").removeClass("curr").css("display", "none");
        $("#" + this.componentId + "-fifth-level-selector").removeClass("curr").css("display", "none");
    }

    onClickThirdLevelSelector() {
        this.setState(
            {
                showFirstLevel: false,
                showSecondLevel: false,
                showThirdLevel: true,
                showFourthLevel: false,
                showFifthLevel: false
            }
        );

        $("#" + this.componentId + "-first-level-selector").removeClass("curr").css("display", "");
        $("#" + this.componentId + "-second-level-selector").removeClass("curr").css("display", "");
        $("#" + this.componentId + "-third-level-selector").addClass("curr").css("display", "");
        $("#" + this.componentId + "-fourth-level-selector").removeClass("curr").css("display", "none");
        $("#" + this.componentId + "-fifth-level-selector").removeClass("curr").css("display", "none");
    }

    onClickFourthLevelSelector() {
        this.setState(
            {
                showFirstLevel: false,
                showSecondLevel: false,
                showThirdLevel: false,
                showFourthLevel: true,
                showFifthLevel: false
            }
        );

        $("#" + this.componentId + "-first-level-selector").removeClass("curr").css("display", "");
        $("#" + this.componentId + "-second-level-selector").removeClass("curr").css("display", "");
        $("#" + this.componentId + "-third-level-selector").removeClass("curr").css("display", "");
        $("#" + this.componentId + "-fourth-level-selector").addClass("curr").css("display", "");
        $("#" + this.componentId + "-fifth-level-selector").removeClass("curr").css("display", "none");
    }

    onClickFifthLevelSelector() {
        this.setState(
            {
                showFirstLevel: false,
                showSecondLevel: false,
                showThirdLevel: false,
                showFourthLevel: false,
                showFifthLevel: true
            }
        );

        $("#" + this.componentId + "-first-level-selector").removeClass("curr").css("display", "");
        $("#" + this.componentId + "-second-level-selector").removeClass("curr").css("display", "");
        $("#" + this.componentId + "-third-level-selector").removeClass("curr").css("display", "");
        $("#" + this.componentId + "-fourth-level-selector").removeClass("curr").css("display", "");
        $("#" + this.componentId + "-fifth-level-selector").addClass("curr").css("display", "");
    }

    getFirstLevelItems() {
        if (this.props.datasource instanceof Function) {

            let lisBody = [];
            let ulBody = [];
            var _self = this;
            this.props.datasource(this.props.codeTableArr).then((result) => {
                _self.firstLevelItems = result;

                //if (this.currInfo.currentLevel == 1) {
                $.each(_self.firstLevelItems, function (index, element) {
                    lisBody.push(<li><a href="javascript:void (0);" data-value={element.id}
                        onClick={_self.onClickFirstLevel.bind(_self)}>{element.name}</a></li>);
                });
                ulBody.push(<ul className="area-list">{lisBody}</ul>);
                //}
                // return ulBody;
                _self.setState({
                    firstStateItems: ulBody
                })
            }, () => {

            });
        }

    }

    onClickFirstLevel(event) {
        const firstLevelId = event.target.getAttribute("data-value");

        if (this.props.datasource instanceof Function) {

            this.props.datasource(this.props.codeTableArr, firstLevelId).then((result) => {
                this.secondLevelItems = result;

                this.currInfo = {
                    "currentLevel": 1,
                    "firstLevelId": firstLevelId,
                    "firstLevelName": this.getFirstLevelNameById(firstLevelId),
                    "secondLevelId": 0,
                    "secondLevelName": "",
                    "thirdLevelId": 0,
                    "thirdLevelName": "",
                    "fourthLevelId": 0,
                    "fourthLevelName": "",
                    "fifthLevelId": 0,
                    "fifthLevelName": ""
                };

                if (this.secondLevelItems == null || this.secondLevelItems.length == 0) {
                    $("#" + this.componentId + "-first-level-selector").removeClass("curr").find("em").html(this.currInfo.firstLevelName);
                    $("#" + this.componentId + "-store-selector").removeClass("hover");
                    $("#" + this.componentId + "-store-selector .content, #" + this.componentId + "-JD-stock").hide();
                    $("#" + this.componentId + "-cascade-detail").html(this.currInfo.firstLevelName);
                    return;
                }

                this.setState(
                    {
                        showFirstLevel: false,
                        showSecondLevel: true,
                        showThirdLevel: false,
                        showFourthLevel: false,
                        showFifthLevel: false
                    }
                );

                $("#" + this.componentId + "-first-level-selector").removeClass("curr").find("em").html(this.currInfo.firstLevelName);
                $("#" + this.componentId + "-second-level-selector").addClass("curr").css("display", "").find("em").html(i18n.BlankOption);
            });

        }

    }

    getFirstLevelNameById(firstLevelId) {
        for (var i = 0; i < this.firstLevelItems.length; i++) {
            if (this.firstLevelItems[i] && this.firstLevelItems[i].id == firstLevelId) {
                return this.firstLevelItems[i].name;
            }
        }
    }

    getSecondLevelItems() {
        let lisBody = [];
        let ulBody = [];
        var _self = this;
        //if (this.currInfo.currentLevel == 1) {
        $.each(this.secondLevelItems, function (index, element) {
            lisBody.push(<li><a href="javascript:void (0);" data-value={element.id} onClick={_self.onClickSecondLevel.bind(_self)}>{element.name}</a></li>);
        });
        ulBody.push(<ul className="area-list">{lisBody}</ul>);
        //}
        return ulBody;
    }

    onClickSecondLevel(event) {
        const secondLevelId = event.target.getAttribute("data-value");

        if (this.props.datasource instanceof Function) {
            this.props.datasource(this.props.codeTableArr, this.currInfo.firstLevelId, secondLevelId).then((result) => {
                this.thirdLevelItems = result


                this.currInfo = {
                    "currentLevel": 2,
                    "firstLevelId": this.currInfo.firstLevelId,
                    "firstLevelName": this.currInfo.firstLevelName,
                    "secondLevelId": secondLevelId,
                    "secondLevelName": this.getSecondLevelNameById(secondLevelId),
                    "thirdLevelId": 0,
                    "thirdLevelName": "",
                    "fourthLevelId": 0,
                    "fourthLevelName": "",
                    "fifthLevelId": 0,
                    "fifthLevelName": ""
                };

                if (this.thirdLevelItems == null || this.thirdLevelItems.length == 0) {
                    $("#" + this.componentId + "-second-level-selector").removeClass("curr").find("em").html(this.currInfo.secondLevelName);
                    $("#" + this.componentId + "-store-selector").removeClass("hover");
                    $("#" + this.componentId + "-store-selector .content, #" + this.componentId + "-JD-stock").hide();
                    $("#" + this.componentId + "-cascade-detail").html(this.currInfo.firstLevelName + this.currInfo.secondLevelName);
                    return;
                }

                this.setState(
                    {
                        showFirstLevel: false,
                        showSecondLevel: false,
                        showThirdLevel: true,
                        showFourthLevel: false,
                        showFifthLevel: false
                    }
                );

                $("#" + this.componentId + "-second-level-selector").removeClass("curr").find("em").html(this.currInfo.secondLevelName);
                $("#" + this.componentId + "-third-level-selector").addClass("curr").css("display", "").find("em").html(i18n.BlankOption);

            }, () => {
                this.thirdLevelItems = null
                $("#" + this.componentId + "-second-level-selector").removeClass("curr").find("em").html(this.currInfo.secondLevelName);
                $("#" + this.componentId + "-store-selector").removeClass("hover");
                $("#" + this.componentId + "-store-selector .content, #" + this.componentId + "-JD-stock").hide();
                $("#" + this.componentId + "-cascade-detail").html(this.currInfo.firstLevelName + this.currInfo.secondLevelName);
                return;
            });

        }
    }

    getSecondLevelNameById(secondLevelId) {
        const secondLevelItems = this.secondLevelItems;
        for (var i = 0; i < secondLevelItems.length; i++) {
            if (secondLevelItems[i] && secondLevelItems[i].id == secondLevelId) {
                return secondLevelItems[i].name;
            }
        }
    }

    getThirdLevelItems() {
        let lisBody = [];
        let ulBody = [];
        var _self = this;
        //if (this.currInfo.currentLevel == 2) {
        $.each(this.thirdLevelItems, function (index, element) {
            lisBody.push(<li><a href="javascript:void (0);" data-value={element.id} onClick={_self.onClickThirdLevel.bind(_self)}>{element.name}</a></li>);
        });
        ulBody.push(<ul className="area-list">{lisBody}</ul>);
        //}
        return ulBody;
    }

    onClickThirdLevel(event) {
        const thirdLevelId = event.target.getAttribute("data-value");

        if (this.props.datasource instanceof Function) {
            this.props.datasource(this.props.codeTableArr, this.currInfo.firstLevelId, this.currInfo.secondLevelId, thirdLevelId).then((result) => {
                this.fourthLevelItems = result

                this.currInfo = {
                    "currentLevel": 3,
                    "firstLevelId": this.currInfo.firstLevelId,
                    "firstLevelName": this.currInfo.firstLevelName,
                    "secondLevelId": this.currInfo.secondLevelId,
                    "secondLevelName": this.currInfo.secondLevelName,
                    "thirdLevelId": thirdLevelId,
                    "thirdLevelName": this.getThirdLevelNameById(thirdLevelId),
                    "fourthLevelId": 0,
                    "fourthLevelName": "",
                    "fifthLevelId": 0,
                    "fifthLevelName": ""
                };

                if (this.fourthLevelItems == null || this.fourthLevelItems.length == 0) {
                    $("#" + this.componentId + "-third-level-selector").removeClass("curr").find("em").html(this.currInfo.thirdLevelName);
                    $("#" + this.componentId + "-store-selector").removeClass("hover");
                    $("#" + this.componentId + "-store-selector .content, #" + this.componentId + "-JD-stock").hide();
                    $("#" + this.componentId + "-cascade-detail").html(this.currInfo.firstLevelName + this.currInfo.secondLevelName +
                        this.currInfo.thirdLevelName);
                    return;
                }

                this.setState(
                    {
                        showFirstLevel: false,
                        showSecondLevel: false,
                        showThirdLevel: false,
                        showFourthLevel: true,
                        showFifthLevel: false
                    }
                );

                $("#" + this.componentId + "-third-level-selector").removeClass("curr").find("em").html(this.currInfo.thirdLevelName);
                $("#" + this.componentId + "-fourth-level-selector").addClass("curr").css("display", "").find("em").html(i18n.BlankOption);

            }, () => {

                this.fourthLevelItems = null
                $("#" + this.componentId + "-third-level-selector").removeClass("curr").find("em").html(this.currInfo.thirdLevelName);
                $("#" + this.componentId + "-store-selector").removeClass("hover");
                $("#" + this.componentId + "-store-selector .content, #" + this.componentId + "-JD-stock").hide();
                $("#" + this.componentId + "-cascade-detail").html(this.currInfo.firstLevelName + this.currInfo.secondLevelName +
                    this.currInfo.thirdLevelName);
                return;
            })
        }
    }

    getThirdLevelNameById(thirdLevelId) {
        const fifthLevelItems = this.thirdLevelItems;
        for (var i = 0; i < fifthLevelItems.length; i++) {
            if (fifthLevelItems[i] && fifthLevelItems[i].id == thirdLevelId) {
                return fifthLevelItems[i].name;
            }
        }
    }

    getFourthLevelItems() {
        let lisBody = [];
        let ulBody = [];
        var _self = this;
        //if (this.currInfo.currentLevel == 3) {
        $.each(this.fourthLevelItems, function (index, element) {
            lisBody.push(<li><a href="javascript:void (0);" data-value={element.id} onClick={_self.onClickFourthLevel.bind(_self)}>{element.name}</a></li>);
        });
        ulBody.push(<ul className="area-list">{lisBody}</ul>);
        //}
        return ulBody;
    }

    onClickFourthLevel(event) {
        const fourthLevelId = event.target.getAttribute("data-value");

        if (this.props.datasource instanceof Function) {
            this.props.datasource(this.props.codeTableArr, this.currInfo.firstLevelId, this.currInfo.secondLevelId, this.currInfo.thirdLevelId, fourthLevelId).then((result) => {
                this.fifthLevelItems = result

                this.currInfo = {
                    "currentLevel": 4,
                    "firstLevelId": this.currInfo.firstLevelId,
                    "firstLevelName": this.currInfo.firstLevelName,
                    "secondLevelId": this.currInfo.secondLevelId,
                    "secondLevelName": this.currInfo.secondLevelName,
                    "thirdLevelId": this.currInfo.thirdLevelId,
                    "thirdLevelName": this.currInfo.thirdLevelName,
                    "fourthLevelId": fourthLevelId,
                    "fourthLevelName": this.getFourthLevelNameById(fourthLevelId),
                    "fifthLevelId": 0,
                    "fifthLevelName": ""
                };

                if (this.fifthLevelItems == null || this.fifthLevelItems.length == 0) {
                    $("#" + this.componentId + "-fourth-level-selector").removeClass("curr").find("em").html(this.currInfo.fourthLevelName);
                    $("#" + this.componentId + "-store-selector").removeClass("hover");
                    $("#" + this.componentId + "-store-selector .content, #" + this.componentId + "-JD-stock").hide();
                    $("#" + this.componentId + "-cascade-detail").html(this.currInfo.firstLevelName + this.currInfo.secondLevelName +
                        this.currInfo.thirdLevelName + this.currInfo.fourthLevelName);
                    return;
                }

                this.setState(
                    {
                        showFirstLevel: false,
                        showSecondLevel: false,
                        showThirdLevel: false,
                        showFourthLevel: false,
                        showFifthLevel: true
                    }
                );

                $("#" + this.componentId + "-fourth-level-selector").removeClass("curr").find("em").html(this.currInfo.fourthLevelName);
                $("#" + this.componentId + "-fifth-level-selector").addClass("curr").css("display", "").find("em").html(i18n.BlankOption);

            }, () => {
                console.log("err")
            })
        }
    }

    getFourthLevelNameById(fourthLevelId) {
        const fourthLevelItems = this.fourthLevelItems;
        for (var i = 0; i < fourthLevelItems.length; i++) {
            if (fourthLevelItems[i] && fourthLevelItems[i].id == fourthLevelId) {
                return fourthLevelItems[i].name;
            }
        }
    }

    getFifthLevelItems() {
        let lisBody = [];
        let ulBody = [];
        var _self = this;
        //if (this.currInfo.currentLevel == 4) {
        $.each(this.fifthLevelItems, function (index, element) {
            lisBody.push(<li><a href="javascript:void (0);" data-value={element.id} onClick={_self.onClickFifthLevel.bind(_self)}>{element.name}</a></li>);
        });
        ulBody.push(<ul className="area-list">{lisBody}</ul>);
        //}
        return ulBody;
    }

    onClickFifthLevel(event) {
        const fifthLevelId = event.target.getAttribute("data-value");

        this.setState(
            {
                showFirstLevel: false,
                showSecondLevel: false,
                showThirdLevel: false,
                showFourthLevel: false,
                showFifthLevel: true
            }
        );

        this.currInfo = {
            "currentLevel": 5,
            "firstLevelId": this.currInfo.firstLevelId,
            "firstLevelName": this.currInfo.firstLevelName,
            "secondLevelId": this.currInfo.secondLevelId,
            "secondLevelName": this.currInfo.secondLevelName,
            "thirdLevelId": this.currInfo.thirdLevelId,
            "thirdLevelName": this.currInfo.thirdLevelName,
            "fourthLevelId": this.currInfo.fourthLevelId,
            "fourthLevelName": this.currInfo.fourthLevelName,
            "fifthLevelId": fifthLevelId,
            "fifthLevelName": this.getFifthLevelNameById(fifthLevelId)
        };

        $("#" + this.componentId + "-fifth-level-selector").removeClass("curr").find("em").html(this.currInfo.fifthLevelName);
        $("#" + this.componentId + "-store-selector").removeClass("hover");
        $("#" + this.componentId + "-store-selector .content, #" + this.componentId + "-JD-stock").hide();
        $("#" + this.componentId + "-cascade-detail").html(this.currInfo.firstLevelName + this.currInfo.secondLevelName +
            this.currInfo.thirdLevelName + this.currInfo.fourthLevelName + this.currInfo.fifthLevelName);
    }

    getFifthLevelNameById(fifthLevelId) {
        const fifthLevelItems = this.fifthLevelItems;
        for (var i = 0; i < fifthLevelItems.length; i++) {
            if (fifthLevelItems[i] && fifthLevelItems[i].id == fifthLevelId) {
                return fifthLevelItems[i].name;
            }
        }
    }

    onClickSelector() {
        $("#" + this.componentId + "store-selector").removeClass('hover');
        $("#" + this.componentId + "-store-selector .content, #" + this.componentId + "-JD-stock").hide();
    }

    getWidthAllocation() {
        let allocation = this.props.widthAllocation.split(",");
        let widthAllocation = [];
        widthAllocation[0] = StringUtil.trim(allocation[0]);
        widthAllocation[1] = StringUtil.trim(allocation[1]);

        return widthAllocation;
    }

    getStyleClassArray() {
        let allocation = this.getWidthAllocation();
        let styleClass = [];
        styleClass[0] = "col-sm-" + allocation[0] + " col-md-" + allocation[0] + " col-lg-" + allocation[0];
        styleClass[1] = "col-sm-" + allocation[1] + " col-md-" + allocation[1] + " col-lg-" + allocation[1];

        return styleClass;
    }
}

/**
 * cascadeSelector component prop types
 */
cascadeSelector.propTypes = $.extend({}, KeyValue.propTypes, {
    id: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    widthAllocation: PropTypes.string,
    datasource: PropTypes.func,
    codeTableArr: PropTypes.array
});

cascadeSelector.defaultProps = $.extend({}, Component.defaultProps, {
    widthAllocation: "4,8"
});

