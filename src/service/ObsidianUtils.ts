export function setActiveTabTitle(document: Document, title: string): void {
    const tabTitleElement = document.querySelector(
        '.workspace-tabs.mod-active .workspace-tab-header.is-active .workspace-tab-header-inner-title'
    );

    if (tabTitleElement && 'innerText' in tabTitleElement) {
        tabTitleElement.innerText = title
    }
}

