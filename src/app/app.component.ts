import { Component, OnInit, ViewChild } from '@angular/core';
import { AnalogClock } from 'customizable-analog-clock';
import tinycolor from 'tinycolor2';
import js_beautify from 'js-beautify';
import fscreen from 'fscreen';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    showDate: boolean;
    showDigitalClock: boolean;
    showIndicators: boolean;
    darkMode: boolean;
    styleOptions: any;
    indicators: string[];
    config: any;
    active: number;
    selectedStyle: any;
    codeOptions: any;
    timeout: any;
    @ViewChild('fullScreen') divRef;
    hasFullscreenSupport: boolean;
    isFullscreen: boolean;
    setFullScreenError: any;
    toastTimeout: any;

    ngOnInit() {
        this.getDefaultStyles();
        this.applyStyles();
        this.hasFullscreenSupport = fscreen.fullscreenEnabled;
        if (this.hasFullscreenSupport) {
            fscreen.addEventListener('fullscreenchange', () => {
                this.isFullscreen = fscreen.fullscreenElement ? true: false;
                const elem = document.getElementById('my-clock');
                if (this.isFullscreen) {
                    if (elem) {
                        elem.style.width = elem.style.height = 'calc(50vw - 30px)';
                    }
                } else {
                    if (elem) {
                        elem.style.width = elem.style.height = 'calc(38vw - 30px)';
                    }
                }
            }, false);
        }
    }

    getDefaultStyles = () => {
        this.active = 1;
        this.darkMode = true;
        this.showDate = false;
        this.showDigitalClock = false;
        this.showIndicators = true;
        this.styleOptions = {
            fontSize: '30',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
            clockBackgroundColor: '#091921',
            clockBackgroundImage: '',
            clockBorderColor: '#132833',
            clockCenterBorderColor: '#fa9f22',
            clockCenterBackgroundColor: '#091921',
            clockSecondHandColor: '#fa9f22',
            clockMinuteHandColor: '#ffffff',
            clockHourHandColor: '#ffffff',
            clockIndicatorColor: '#607d8b',
            clockIndicatorIconColor: '#03a9f4',
            clockIndicatorMainColor: '#03a9f4',
            dateColor: '#c9c9c9',
            dateBackgroundColor: '#13222a',
            digitalClockColor: '#c9c9c9',
            digitalClockBackgroundColor: '#13222a'
        }
        this.indicators = ['😄', '🙂', '🥪' , '🦜', '🐊', '💻', '🐅', '🐼', '🐘', '🚴‍♂️', '🏂', '🧑'];
        this.codeOptions = {
            theme: 'default',
            mode: 'application/json',
            lineWrapping: true,
            lineNumbers: false
        }
    }

    applyStyles = () => {
        if(typeof(this.indicators) === 'string') {
            const indicatorString: string = this.indicators;
            this.indicators = indicatorString.split(',');
        }
        const clock = new AnalogClock({
            htmlElement: 'my-clock',
            showDate: this.showDate,
            showDigitalClock: this.showDigitalClock,
            showIndicators: this.showIndicators,
            clockIndicators : this.indicators,
            styleOptions : {
                fontSize: this.styleOptions.fontSize + 'px',
                fontFamily: this.styleOptions.fontFamily,
                clockBackgroundColor: this.styleOptions.clockBackgroundColor,
                clockBackgroundImage: this.styleOptions.clockBackgroundImage,
                clockBorderColor: this.styleOptions.clockBorderColor,
                clockCenterBorderColor: this.styleOptions.clockCenterBorderColor,
                clockCenterBackgroundColor: this.styleOptions.clockCenterBackgroundColor,
                clockSecondHandColor: this.styleOptions.clockSecondHandColor,
                clockMinuteHandColor: this.styleOptions.clockMinuteHandColor,
                clockHourHandColor: this.styleOptions.clockHourHandColor,
                clockIndicatorColor: this.styleOptions.clockIndicatorColor,
                clockIndicatorIconColor: this.styleOptions.clockIndicatorIconColor,
                clockIndicatorMainColor: this.styleOptions.clockIndicatorMainColor,
                dateColor: this.styleOptions.dateColor,
                dateBackgroundColor: this.styleOptions.dateBackgroundColor,
                digitalClockColor: this.styleOptions.digitalClockColor,
                digitalClockBackgroundColor: this.styleOptions.digitalClockBackgroundColor
            }
        })
        this.config = js_beautify(JSON.stringify(clock.config), null);
    }

    randomize = () => {
        Object.keys(this.styleOptions).forEach((key) => {
            if(key.indexOf('Color') > -1) {
                this.styleOptions[key] = tinycolor.random().toHexString();
            }
        })
        this.applyStyles();
    }

    resetValues = () => {
        this.getDefaultStyles();
        this.applyStyles();
    }

    toggleColorPicker = (colorPickerPopover, styleName) => {
        if (colorPickerPopover.isOpen()) {
            colorPickerPopover.close();
        } else {
            colorPickerPopover.autoClose = 'outside';
            if (colorPickerPopover.placement === 'auto') {
                colorPickerPopover.placement = 'top';
            }
            colorPickerPopover.popoverClass = 'color-picker-popover';
            colorPickerPopover.open({
                color: this.styleOptions[`${styleName}`]
            });
            this.selectedStyle = styleName;
        }
    }

    colorPickerEvent = ($event) => {
        this.styleOptions[`${this.selectedStyle}`] = $event.color.hex;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.applyStyles();
        }, 500);
    }

    clockFullScreen = () => {
        this.setFullScreenError = null;
        if (this.hasFullscreenSupport && !this.isFullscreen) {
            const elem = this.divRef.nativeElement;
            fscreen.requestFullscreen(elem);
        } else {
            this.setFullScreenError = 'Full Screen Not Supported. Please Try Disabling Adblocker or Other Extensions';
            clearTimeout(this.toastTimeout);
            this.toastTimeout = setTimeout(() => {
                this.setFullScreenError = null;
            }, 3000);
        }
    }
}
