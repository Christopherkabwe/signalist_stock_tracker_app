"use client";

import React, { useCallback, useState } from 'react';

type Props = {
    symbol: string;
    company: string;
    isInWatchlist: boolean;
    showTrashIcon?: boolean;
    type?: 'button' | 'icon';
    onWatchlistChange?: (symbol: string, isAdded: boolean) => void;
};

const WatchlistButton = ({ symbol, company, isInWatchlist, showTrashIcon = false, type = 'button', onWatchlistChange }: Props) => {
    const [added, setAdded] = useState<boolean>(!!isInWatchlist);

    const handleClick = useCallback(() => {
        const next = !added;
        setAdded(next);
        try {
            onWatchlistChange?.(symbol, next);
        } catch (err) {
            // keep this component resilient — swallow errors from parent callbacks
            console.error('WatchlistButton onWatchlistChange callback failed', err);
        }
    }, [added, onWatchlistChange, symbol]);

    // Simple UI using existing app classes (watchlist-btn / watchlist-remove) so styles from the project apply
    if (type === 'icon') {
        return (
            <button aria-pressed={added} title={added ? 'Remove from watchlist' : `Add ${company} to watchlist`} className={`watchlist-icon-btn ${added ? 'watchlist-icon-added' : ''}`} onClick={handleClick}>
                {added ? '★' : '☆'}
            </button>
        );
    }

    return (
        <div className="w-full">
            <button className={`watchlist-btn ${added ? 'watchlist-remove' : ''}`} onClick={handleClick}>{added ? 'Remove from watchlist' : 'Add to watchlist'}</button>
            {showTrashIcon && added ? <div className="mt-2 text-xs text-gray-400">Click again to remove</div> : null}
        </div>
    );
};

export default WatchlistButton;
