import { Component, HostListener, Renderer2, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-theme-customizer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './theme-customizer.html'
})
export class ThemeCustomizerComponent {
  isOpen = false;
  isInspecting = false;
  
  selectedElement: HTMLElement | null = null;
  targetName = 'None';
  
  // UI Models
  styles = {
    textColor: '#000000',
    bgColor: '#ffffff',
    borderColor: '#000000',
    fontSize: '16px',
    fontWeight: '400',
    padding: '0px',
    margin: '0px',
    text: ''
  };

  // Undo History & Previous States
  history: Array<{ element: HTMLElement, prop: string, oldVal: string, newVal: string }> = [];
  previousStyles: { [key: string]: string } = {};

  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {}

  togglePanel() {
    this.isOpen = !this.isOpen;
  }

  toggleInspector(event: any) {
    this.isInspecting = event.target.checked;
    if (this.isInspecting) {
      this.renderer.addClass(this.document.body, 'customizer-inspecting');
    } else {
      this.renderer.removeClass(this.document.body, 'customizer-inspecting');
      this.deselectElement();
    }
  }

  @HostListener('document:click', ['$event'])
  onGlobalClick(event: MouseEvent) {
    if (!this.isInspecting) return;
    
    const target = event.target as HTMLElement;
    if (target.closest('#wp-customizer') || target.closest('#customizer-toggle')) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    this.selectElement(target);
  }

  selectElement(el: HTMLElement) {
    if (this.selectedElement) {
      this.renderer.removeClass(this.selectedElement, 'customizer-selected');
    }
    
    this.selectedElement = el;
    this.renderer.addClass(this.selectedElement, 'customizer-selected');
    
    this.targetName = `<${el.tagName.toLowerCase()}>`;
    const computed = window.getComputedStyle(el);
    
    // UI में वैल्यू दिखाएं
    this.styles.textColor = this.rgbToHex(computed.color);
    this.styles.bgColor = this.rgbToHex(computed.backgroundColor);
    this.styles.borderColor = this.rgbToHex(computed.borderColor);
    this.styles.fontSize = computed.fontSize;
    this.styles.fontWeight = computed.fontWeight;
    this.styles.padding = computed.padding;
    this.styles.margin = computed.margin;
    
    // Undo के लिए पुरानी वैल्यू सेव करें
    this.previousStyles['color'] = this.styles.textColor;
    this.previousStyles['background-color'] = this.styles.bgColor;
    this.previousStyles['border-color'] = this.styles.borderColor;
    this.previousStyles['font-size'] = this.styles.fontSize;
    this.previousStyles['font-weight'] = this.styles.fontWeight;
    this.previousStyles['padding'] = this.styles.padding;
    this.previousStyles['margin'] = this.styles.margin;

    if (el.children.length === 0) {
        this.styles.text = el.innerText;
        this.previousStyles['innerText'] = el.innerText;
    } else {
        this.styles.text = '[Contains Sub-Elements]';
    }
    
    this.isOpen = true;
  }

  deselectElement() {
    if (this.selectedElement) {
      this.renderer.removeClass(this.selectedElement, 'customizer-selected');
      this.selectedElement = null;
    }
  }

  // 1. LIVE UPDATE FUNCTION (सिर्फ स्क्रीन पर दिखाने के लिए)
  updateLiveStyle(cssProp: string, value: string) {
    if (!this.selectedElement) return;
    this.renderer.setStyle(this.selectedElement, cssProp, value, 1);
    
    if(cssProp === 'background-color') this.renderer.setStyle(this.selectedElement, 'background-image', 'none', 1);
    if(cssProp === 'color') this.renderer.setStyle(this.selectedElement, '-webkit-text-fill-color', value, 1);
  }

  // 2. COMMIT FUNCTION (जब आप कलर चुनकर माउस छोड़ें, तब History सेव होगी)
  commitStyle(cssProp: string, value: string) {
    if (!this.selectedElement) return;
    const oldVal = this.previousStyles[cssProp];
    
    if (oldVal !== value) {
        this.history.push({ element: this.selectedElement, prop: cssProp, oldVal: oldVal, newVal: value });
        this.previousStyles[cssProp] = value; // Update for next change
    }
  }

  // Text Live Edit
  applyTextLive() {
      if (!this.selectedElement || this.selectedElement.children.length > 0) return;
      this.selectedElement.innerText = this.styles.text;
  }

  commitText() {
      if (!this.selectedElement || this.selectedElement.children.length > 0) return;
      const oldVal = this.previousStyles['innerText'];
      if (oldVal !== this.styles.text) {
          this.history.push({ element: this.selectedElement, prop: 'innerText', oldVal: oldVal, newVal: this.styles.text });
          this.previousStyles['innerText'] = this.styles.text;
      }
  }

  hideElement() {
      if (!this.selectedElement) return;
      const oldVal = this.selectedElement.style.display;
      this.renderer.setStyle(this.selectedElement, 'display', 'none', 1);
      this.history.push({ element: this.selectedElement, prop: 'display', oldVal: oldVal, newVal: 'none' });
      this.deselectElement();
  }

  undo() {
    if (this.history.length === 0) return;
    const lastAction = this.history.pop();
    if (lastAction) {
        if (lastAction.prop === 'innerText') {
            lastAction.element.innerText = lastAction.oldVal;
            if (this.selectedElement === lastAction.element) this.styles.text = lastAction.oldVal;
        } else {
            this.renderer.setStyle(lastAction.element, lastAction.prop, lastAction.oldVal, 1);
            
            // UI में भी पुरानी वैल्यू वापस लाएं
            if (this.selectedElement === lastAction.element) {
                if (lastAction.prop === 'color') this.styles.textColor = lastAction.oldVal;
                if (lastAction.prop === 'background-color') this.styles.bgColor = lastAction.oldVal;
                if (lastAction.prop === 'border-color') this.styles.borderColor = lastAction.oldVal;
            }
        }
        this.previousStyles[lastAction.prop] = lastAction.oldVal;
    }
  }

  rgbToHex(rgbStr: string): string {
    if(!rgbStr || rgbStr.startsWith('rgba(0, 0, 0, 0)') || rgbStr === 'transparent') return '#ffffff';
    const rgb = rgbStr.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? "#" +
      ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '#ffffff';
  }
}