import React from 'react';
import { useWallet } from '../contexts/WalletContext';

export default function WalletBanner() {
  const {
    address,
    isConnected,
    walletType,
    walletStatus,
    isConnecting,
    connect,
    disconnect,
  } = useWallet();

  const formatAddress = (value: string) =>
    `${value.slice(0, 8)}…${value.slice(-6)}`;

  if (walletStatus === 'checking') {
    return (
      <div className="wallet-pill loading" role="status">
        <span className="spinner-small" />
        <span>Detecting wallet...</span>
      </div>
    );
  }

  if (isConnected && address) {
    const walletName = walletType === '1am' ? '1AM' : 'Lace';

    return (
      <div className="wallet-pill connected">
        <span className="status-dot connected" />

        <div className="wallet-pill-info">
          <span className="wallet-pill-type">{walletName}</span>
          <span className="wallet-pill-address">
            {formatAddress(address)}
          </span>
        </div>

        <button
          type="button"
          className="btn-icon"
          onClick={disconnect}
          title="Disconnect Wallet"
          aria-label="Disconnect wallet"
        >
          ✕
        </button>
      </div>
    );
  }

  const walletUnavailable = walletStatus === 'not-found';
  const buttonDisabled = isConnecting || walletUnavailable;

  return (
    <button
      type="button"
      className="btn btn-primary btn-sm"
      onClick={() => connect('preprod')}
      disabled={buttonDisabled}
    >
      {isConnecting ? (
        <>
          <span className="spinner-small" />
          <span>Connecting</span>
        </>
      ) : (
        'Connect Wallet'
      )}
    </button>
  );
}
