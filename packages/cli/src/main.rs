use clap::StructOpt;
use dyna_bookmarks::{
    cli::{CliArgs, SubCommandArgs},
    commands::clean,
    commands::rofi,
    commands::sync,
};
use eyre::Result;

fn main() -> Result<()> {
    color_eyre::install()?;

    let args = CliArgs::parse();
    loggerv::init_with_verbosity(args.verbosity)?;

    match args.command {
        SubCommandArgs::Rofi(args) => rofi::run_command(args),
        SubCommandArgs::Sync(args) => sync::run_command(args),
        SubCommandArgs::Clean(args) => clean::run_command(args),
    }
}
