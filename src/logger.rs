extern crate chrono;
extern crate clap;
extern crate fern;


pub mod logger {
    use std::io;

   pub fn setup_logging(verbosity: u64) -> Result<(), fern::InitError> {
        let mut base_config = fern::Dispatch::new();

        base_config = match verbosity {
            0 => {
                // Let's say we depend on something which whose "info" level messages are too
                // verbose to include in end-user output. If we don't need them,
                // let's not include them.
                base_config
                    .level(log::LevelFilter::Info)
                    .level_for("overly-verbose-target", log::LevelFilter::Warn)
            }
            1 => base_config
                .level(log::LevelFilter::Debug)
                .level_for("overly-verbose-target", log::LevelFilter::Info),
            2 => base_config.level(log::LevelFilter::Debug),
            _3_or_more => base_config.level(log::LevelFilter::Trace),
        };

        // Separate file config so we can include year, month and day in file logs
        let file_config = fern::Dispatch::new()
            .format(|out, message, record| {
                out.finish(format_args!(
                    "{}[{}][{}] {}",
                    chrono::Local::now().format("[%Y-%m-%d][%H:%M:%S]"),
                    record.target(),
                    record.level(),
                    message
                ))
            })
            .chain(fern::log_file("program.log")?);

        let stdout_config = fern::Dispatch::new()
            .format(|out, message, record| {
                // special format for debug messages coming from our own crate.
                if record.level() > log::LevelFilter::Info && record.target() == "cmd_program" {
                    out.finish(format_args!(
                        "---\nDEBUG: {}: {}\n---",
                        chrono::Local::now().format("%H:%M:%S"),
                        message
                    ))
                } else {
                    out.finish(format_args!(
                        "[{}][{}][{}] {}",
                        chrono::Local::now().format("%H:%M:%S"),
                        record.target(),
                        record.level(),
                        message
                    ))
                }
            })
            .chain(io::stdout());

        base_config.chain(file_config).chain(stdout_config).apply()?;

        Ok(())
    }
}