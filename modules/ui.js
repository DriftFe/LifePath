// Show a notification at the top of the game container
export function showNotification(message, type = "info") {
    let notif = document.createElement('div');
    notif.className = `notification ${type}`;
    notif.textContent = message;
    notif.style.position = "absolute";
    notif.style.top = "16px";
    notif.style.left = "50%";
    notif.style.transform = "translateX(-50%)";
    notif.style.background = "rgba(56,189,248,0.95)";
    notif.style.color = "#181818";
    notif.style.padding = "12px 24px";
    notif.style.borderRadius = "10px";
    notif.style.boxShadow = "0 2px 8px #0005";
    notif.style.zIndex = 1000;
    notif.style.fontFamily = "'JetBrains Mono', monospace";
    notif.style.fontWeight = "bold";
    notif.style.fontSize = "1.05rem";
    notif.style.opacity = 1;
    document.body.appendChild(notif);
    setTimeout(() => { notif.style.opacity = 0; }, 1800);
    setTimeout(() => { notif.remove(); }, 2200);
  }
  
  // Modal dialog 
  export function showModal(message, onClose) {
    let modalBg = document.createElement('div');
    modalBg.style.position = "fixed";
    modalBg.style.top = 0;
    modalBg.style.left = 0;
    modalBg.style.width = "100vw";
    modalBg.style.height = "100vh";
    modalBg.style.background = "rgba(0,0,0,0.4)";
    modalBg.style.display = "flex";
    modalBg.style.alignItems = "center";
    modalBg.style.justifyContent = "center";
    modalBg.style.zIndex = 1001;
  
    let modal = document.createElement('div');
    modal.style.background = "rgba(30,41,59,0.98)";
    modal.style.padding = "32px 28px";
    modal.style.borderRadius = "18px";
    modal.style.boxShadow = "0 4px 24px #0007";
    modal.style.fontFamily = "'JetBrains Mono', monospace";
    modal.style.color = "#f8fafc";
    modal.innerHTML = `<div style="margin-bottom:22px">${message}</div>`;
    let closeBtn = document.createElement('button');
    closeBtn.textContent = "Close";
    closeBtn.className = "glass-btn";
    closeBtn.onclick = () => {
      modalBg.remove();
      if (onClose) onClose();
    };
    modal.appendChild(closeBtn);
    modalBg.appendChild(modal);
    document.body.appendChild(modalBg);
  }
  
  // Utility: clear a panel by id
  export function clearPanel(id) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = '';
  }
  