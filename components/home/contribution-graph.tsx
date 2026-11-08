/**
 * 贡献热力图（示意数据）。接入真实数据时，可在构建时读取 git log 统计每天的文档提交数。
 */
const OPACITY = [0, 0.3, 0.6, 1];

function level(week: number, day: number) {
  const v = (week * 37 + day * 11 + week * day * 3) % 9;
  let lv = v < 3 ? 0 : v < 6 ? 1 : v < 8 ? 2 : 3;
  if (week / 11 > 0.6 && lv < 3 && v % 2 === 0) lv += 1;
  if (day >= 5 && lv > 0) lv -= 1;
  return lv;
}

export function ContributionGraph() {
  return (
    <div data-reveal className="rounded-[18px] border border-white/8 bg-cairn-card p-6">
      <div className="flex items-baseline justify-between gap-3">
        <div className="text-[15px] font-semibold">石堆在长高</div>
        <div className="text-xs text-cairn-muted">近 12 周文档更新（示意）</div>
      </div>
      <div className="mt-[18px] flex gap-[5px] overflow-x-auto" role="img" aria-label="近 12 周文档更新热力图">
        {Array.from({ length: 12 }, (_, w) => (
          <div key={w} className="flex flex-col gap-[5px]">
            {Array.from({ length: 7 }, (_, d) => {
              const lv = level(w, d);
              return (
                <span
                  key={d}
                  className={`block size-4 rounded ${lv === 0 ? 'bg-white/5' : 'bg-cairn-accent'}`}
                  style={lv === 0 ? undefined : { opacity: OPACITY[lv] }}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-3.5 flex items-center gap-1.5 text-[11px] text-cairn-muted">
        少
        <span className="size-3 rounded-[3px] bg-white/5" />
        <span className="size-3 rounded-[3px] bg-cairn-accent opacity-30" />
        <span className="size-3 rounded-[3px] bg-cairn-accent opacity-60" />
        <span className="size-3 rounded-[3px] bg-cairn-accent" />多
      </div>
    </div>
  );
}
