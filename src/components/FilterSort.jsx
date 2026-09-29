import { useState, useRef, useEffect } from 'react';

const FilterSort = ({ totalCount, visibleCount, onLoadMore, hasMore = false }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [selectedSort, setSelectedSort] = useState('BEST SELLERS');
  // true → bar is fixed to the viewport bottom; false → it sits in-flow
  const [isFixed, setIsFixed] = useState(true);
  const sentinelRef = useRef(null); // invisible element placed just above footer

  // Watch the sentinel. When it enters the viewport the footer is close →
  // drop the bar out of fixed mode so it flows naturally above the footer.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFixed(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '0px 0px 0px 0px' },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const filters = {
    Categories: ['SHOES'],
    Colors: [
      'BLACK',
      'BLACK/PEARL/MILK',
      'BLUE',
      'BROWN',
      'DUST',
      'MILK',
      'MULTI',
      'NATURAL',
      'PINK',
      'PURPLE',
      'YELLOW',
    ],
    'Shoe size': [
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '19',
      '20',
      '21',
      '22',
      '23',
      '24',
      '25',
      '26',
      '27',
      '28',
      '29',
      '30',
      '31',
      '32',
      '33',
      '34',
      '35',
      '36',
      '37',
      '38',
      '39',
      '40',
      '41',
      '42',
      '43',
      '44',
      '12',
      '13',
      '45',
      '46',
      '47',
      '48',
      '35½',
      '37½',
      '38½',
      '39½',
      '40½',
      '41½',
      '42½',
      '43½',
      '44½',
      '45½',
      '6,5',
      '9,5',
    ],
    Lines: ['DRKSHDW', 'RICK OWENS', 'RICK OWENS LILIES'],
    Season: ['FW26 TOWER', 'SPRING - SUMMER 2023'],
    Collaboration: ['DR.MARTENS'],
  };

  const sortOptions = ['BEST SELLERS', 'NEWEST', 'INCREASING PRICES', 'DECREASING PRICES'];

  const toggleFilter = (category, item) => {
    setSelectedFilters(prev => {
      const current = prev[category] || [];
      if (current.includes(item)) {
        const updated = current.filter(i => i !== item);
        if (updated.length === 0) {
          const next = { ...prev };
          delete next[category];
          return next;
        }
        return { ...prev, [category]: updated };
      } else {
        return { ...prev, [category]: [...current, item] };
      }
    });
  };

  const resetSelections = () => {
    if (activeModal === 'filter') setSelectedFilters({});
    else if (activeModal === 'sort') setSelectedSort(null);
  };

  const renderFilterItem = (category, item) => {
    const isSelected = selectedFilters[category]?.includes(item);
    return (
      <button
        key={item}
        type="button"
        onClick={() => toggleFilter(category, item)}
        className={`relative flex items-center cursor-pointer transition-colors duration-150 uppercase text-left ${
          isSelected ? 'font-bold text-black' : 'font-normal text-black hover:underline'
        }`}>
        <span className="w-2.5 -ml-2.5 inline-block text-left select-none">{isSelected ? '-' : ''}</span>
        <span>{item}</span>
      </button>
    );
  };

  // The bar markup — shared between fixed and in-flow modes
  const Bar = (
    <div className="flex flex-col items-center gap-2.5 w-full px-4">
      {/* LOAD MORE */}
      {onLoadMore && hasMore && (
        <button
          type="button"
          onClick={onLoadMore}
          className="w-full max-w-[380px] h-[44px] rounded-[2px] flex items-center justify-between px-5 bg-white border border-[#d4d4d4] text-[11px] tracking-[0.14em] uppercase hover:border-black transition-colors cursor-pointer">
          <span className="font-bold text-black">LOAD MORE</span>
          <span className="font-normal text-[#777777]">
            {visibleCount}/{totalCount} PRODUCTS
          </span>
        </button>
      )}

      {/* FILTERS | SORT */}
      <div
        className={`w-full max-w-[380px] rounded-[3px] h-[44px] flex items-center bg-[#767676] text-[11px] tracking-[0.14em] overflow-hidden shadow-sm transition-[opacity,transform] duration-150 ease-out ${
          activeModal ? 'translate-y-2 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
        }`}>
        <button
          type="button"
          onClick={() => setActiveModal('filter')}
          className="flex-1 h-full flex items-center justify-center font-medium text-white hover:bg-black transition-colors duration-200 uppercase cursor-pointer">
          FILTERS
        </button>
        <div className="w-[1px] h-4 bg-white/20 self-center" />
        <button
          type="button"
          onClick={() => setActiveModal('sort')}
          className="flex-1 h-full flex items-center justify-center font-medium text-white hover:bg-black transition-colors duration-200 uppercase cursor-pointer">
          SORT
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/*
        Sentinel — invisible marker placed where the bar would naturally live.
        Once visible the IntersectionObserver tells the bar to un-fix.
      */}
      <div ref={sentinelRef} aria-hidden="true" className="w-full h-0" />

      {/* In-flow placeholder keeps the page height consistent when bar is fixed */}
      <div
        className={`w-full flex flex-col items-center pt-32 pb-12 sm:pt-24 ${
          isFixed ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}>
        {Bar}
      </div>

      {/* Fixed Filter/Sort controls stay separate from the in-flow Load More button. */}
      {isFixed && (
        <div className="fixed bottom-8 left-0 right-0 flex justify-center px-4 z-30 pointer-events-none">
          <div
            style={{ pointerEvents: activeModal ? 'none' : 'auto' }}
            className={`w-full max-w-[380px] h-[44px] flex items-center bg-[#767676] text-[11px] tracking-[0.14em] overflow-hidden shadow-md transition-[opacity,transform] duration-150 ease-out ${
              activeModal ? 'translate-y-2 opacity-0' : 'translate-y-0 opacity-100'
            }`}>
            <button
              type="button"
              onClick={() => setActiveModal('filter')}
              className="flex-1 h-full flex items-center justify-center font-medium text-white hover:bg-black transition-colors duration-200 uppercase cursor-pointer">
              FILTERS
            </button>
            <div className="w-[1px] h-4 bg-white/20 self-center" />
            <button
              type="button"
              onClick={() => setActiveModal('sort')}
              className="flex-1 h-full flex items-center justify-center font-medium text-white hover:bg-black transition-colors duration-200 uppercase cursor-pointer">
              SORT
            </button>
          </div>
        </div>
      )}

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/25 z-40 transition-opacity duration-200 ${
          activeModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setActiveModal(null)}
      />

      {/* Slide-up Filter / Sort Panel */}
      <div
        className={`fixed bottom-0 inset-x-0 w-full bg-white z-50 border-t border-neutral-300 transition-[transform,opacity] duration-200 ease-out flex flex-col justify-between ${
          activeModal
            ? 'translate-y-0 opacity-100 shadow-[0_-4px_30px_rgba(0,0,0,0.06)]'
            : 'translate-y-full opacity-0 pointer-events-none'
        }`}
        style={{ minHeight: '340px', maxHeight: '90dvh' }}>
        <div className="w-full min-h-0 flex-1 overflow-y-auto">
          {/* FILTER VIEW */}
          {activeModal === 'filter' && (
            <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14 lg:px-20 pt-8 pb-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8 lg:gap-12">
                <div>
                  <h3 className="text-[11px] font-bold tracking-[0.14em] uppercase text-black mb-3">CATEGORIES</h3>
                  <div className="space-y-1.5 text-[11px] tracking-[0.08em] uppercase pl-2.5">
                    {filters.Categories.map(item => renderFilterItem('Categories', item))}
                  </div>
                </div>
                <div>
                  <h3 className="text-[11px] font-bold tracking-[0.14em] uppercase text-black mb-3">COLORS</h3>
                  <div className="space-y-1.5 text-[11px] tracking-[0.08em] uppercase pl-2.5 max-h-[220px] overflow-y-auto">
                    {filters.Colors.map(item => renderFilterItem('Colors', item))}
                  </div>
                </div>
                <div>
                  <h3 className="text-[11px] font-bold tracking-[0.14em] uppercase text-black mb-3">SHOE SIZE</h3>
                  <div className="rick-scrollbar-left h-[210px] pl-3">
                    <div className="space-y-1.5 text-[11px] tracking-[0.08em] uppercase">
                      {filters['Shoe size'].map(item => renderFilterItem('Shoe size', item))}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-[11px] font-bold tracking-[0.14em] uppercase text-black mb-3">LINES</h3>
                  <div className="rick-scrollbar-left h-[210px] pl-3">
                    <div className="space-y-1.5 text-[11px] tracking-[0.08em] uppercase">
                      {filters.Lines.map(item => renderFilterItem('Lines', item))}
                    </div>
                    <h3 className="text-[11px] font-bold tracking-[0.14em] uppercase text-black mt-6 mb-3">SEASON</h3>
                    <div className="space-y-1.5 text-[11px] tracking-[0.08em] uppercase pb-2">
                      {filters.Season.map(item => renderFilterItem('Season', item))}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-[11px] font-bold tracking-[0.14em] uppercase text-black mb-3">COLLABORATION</h3>
                  <div className="space-y-1.5 text-[11px] tracking-[0.08em] uppercase pl-2.5">
                    {filters.Collaboration.map(item => renderFilterItem('Collaboration', item))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SORT VIEW */}
          {activeModal === 'sort' && (
            <div className="w-full flex justify-center pt-8 pb-3">
              <div className="w-fit text-left">
                <h3 className="text-[11px] font-bold tracking-[0.14em] uppercase text-black mb-3">SORT</h3>
                <div className="space-y-1.5 text-[11px] tracking-[0.08em] uppercase pl-2.5">
                  {sortOptions.map(option => {
                    const isSelected = selectedSort === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setSelectedSort(option)}
                        className={`relative flex items-center cursor-pointer transition-colors duration-150 uppercase text-left ${
                          isSelected ? 'font-bold text-black' : 'font-normal text-black hover:underline'
                        }`}>
                        <span className="w-2.5 -ml-2.5 inline-block text-left select-none">
                          {isSelected ? '-' : ''}
                        </span>
                        <span>{option}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RESET / CLOSE */}
        <div className="flex justify-center items-center gap-24 pt-6 pb-7 mt-auto">
          <button
            type="button"
            onClick={resetSelections}
            className="text-[11px] font-normal tracking-[0.14em] uppercase text-[#a3a3a3] hover:text-black hover:underline cursor-pointer transition-colors">
            RESET
          </button>
          <button
            type="button"
            onClick={() => setActiveModal(null)}
            className="text-[11px] font-bold tracking-[0.14em] uppercase text-black hover:underline cursor-pointer transition-colors">
            CLOSE
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterSort;
